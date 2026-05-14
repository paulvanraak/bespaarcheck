import { getProviders, getBenchmark } from './tariffs'

export async function calculateSavings(answers) {
  const context = answers.context || {}
  const results = {}
  let total = 0

  const tasks = [
    answers.energie  && calculateEnergySavings(answers.energie, context).then(r => r && (results.energie = r) && (total += r.yearlySaving)),
    answers.bank     && calculateBankSavings(answers.bank, context).then(r => r && (results.bank = r) && (total += r.yearlySaving)),
    answers.telecom  && calculateTelecomSavings(answers.telecom, context).then(r => r && (results.telecom = r) && (total += r.yearlySaving)),
    answers.verzekering && calculateInsuranceSavings(answers.verzekering, context).then(r => r && (results.verzekering = r) && (total += r.yearlySaving)),
    answers.vpn      && calculateVPNSavings(answers.vpn, context).then(r => r && (results.vpn = r) && (total += r.yearlySaving)),
  ].filter(Boolean)

  await Promise.all(tasks)
  return { results, totalSavings: Math.round(total) }
}

function getTimingAdvice(contractEnd) {
  switch (contractEnd) {
    case 'now':     return 'Je kunt direct overstappen.'
    case '0-3':     return 'Plan de overstap voor wanneer je contract afloopt.'
    case '3-12':    return 'Wacht nog even — zet alvast een reminder voor over 3 maanden.'
    case '12+':     return 'Je contract loopt nog lang. Check de opzegboete voordat je overstapt.'
    default:        return 'Check eerst je contract-einddatum voordat je overstapt.'
  }
}

function calcYearlyForProvider(p, kwh, m3) {
  return (kwh * p.pricing.kwhRate) + (m3 * p.pricing.m3Rate) + (12 * p.pricing.fixedFee)
}

function buildEnergyScenarios(providers, kwh, m3, currentYearly) {
  const byType = {
    variable:  providers.filter(p => p.pricing.contractType === 'variable'),
    fixed_1yr: providers.filter(p => p.pricing.contractType === 'fixed_1yr'),
    fixed_3yr: providers.filter(p => p.pricing.contractType === 'fixed_3yr'),
  }
  const scenarios = {}
  for (const [type, list] of Object.entries(byType)) {
    if (!list.length) continue
    const cheapest = list
      .map(p => ({ provider: p, yearly: calcYearlyForProvider(p, kwh, m3) }))
      .sort((a, b) => a.yearly - b.yearly)[0]
    scenarios[type] = {
      provider: cheapest.provider.slug,
      providerName: cheapest.provider.name,
      yearly: Math.round(cheapest.yearly),
      saving: Math.round(currentYearly - cheapest.yearly),
    }
  }
  return scenarios
}

async function calculateWithHeatpump(kwh, m3, context, answers, providers, currentYearly) {
  // Warmtepomp: hoger stroomverbruik, lager gasverbruik (vervangt deels gas)
  const heatpumpKwh = kwh + 3000
  const heatpumpM3  = Math.max(0, m3 * 0.3) // ~70% gasreductie

  const ranked = providers
    .map(p => ({ provider: p, yearly: calcYearlyForProvider(p, heatpumpKwh, heatpumpM3) }))
    .sort((a, b) => a.yearly - b.yearly)

  if (!ranked.length) return null
  const cheapest = ranked[0]
  const welcomeBonus = cheapest.provider.welcomeBonus?.amount || 0
  const yearTwoSaving = Math.round(currentYearly - cheapest.yearly)

  return {
    currentYearly: Math.round(currentYearly),
    suggestedProvider: cheapest.provider.slug,
    suggestedProviderName: cheapest.provider.name,
    yearlySaving: yearTwoSaving,
    yearOneSaving: Math.round(yearTwoSaving + welcomeBonus),
    welcomeBonus,
    confidence: answers.kwh && answers.m3 ? 0.90 : 0.60,
    timingAdvice: getTimingAdvice(answers.contract_end),
    savable: yearTwoSaving > 50,
    easeOfSwitch: 'medium',
    scenarios: buildEnergyScenarios(providers, heatpumpKwh, heatpumpM3, currentYearly),
    heatpumpNote: 'Berekend met warmtepomp-profiel: meer stroom, minder gas.',
  }
}

async function calculateEnergySavings(answers, context) {
  const benchmark = await getBenchmark('energie', context)
  let kwh = answers.kwh ?? benchmark?.kwh ?? 2700
  let m3  = answers.m3  ?? benchmark?.m3  ?? 1300

  if (answers.has_solar === 'yes_few')  kwh *= 0.7
  if (answers.has_solar === 'yes_many') kwh *= 0.3
  if (answers.has_ev   === 'yes')       kwh += 2500

  const providers = await getProviders('energie', context)
  const avgRate = 0.32, avgGasRate = 1.45, fixedFee = 35
  const currentYearly = (kwh * avgRate) + (m3 * avgGasRate) + (12 * fixedFee)

  // Warmtepomp: apart traject (andere verbruiksverhouding)
  if (answers.has_heatpump === 'yes') {
    return calculateWithHeatpump(kwh, m3, context, answers, providers, currentYearly)
  }

  const ranked = providers
    .map(p => ({ provider: p, yearly: calcYearlyForProvider(p, kwh, m3) }))
    .sort((a, b) => a.yearly - b.yearly)

  if (!ranked.length) return null
  const cheapest = ranked[0]
  const welcomeBonus = cheapest.provider.welcomeBonus?.amount || 0
  const yearOneSaving = Math.round(currentYearly - cheapest.yearly + welcomeBonus)
  const yearTwoSaving = Math.round(currentYearly - cheapest.yearly)
  const confidence = (answers.kwh && answers.m3) ? 0.95 : 0.65

  return {
    currentYearly: Math.round(currentYearly),
    suggestedProvider: cheapest.provider.slug,
    suggestedProviderName: cheapest.provider.name,
    yearlySaving: yearTwoSaving,
    yearOneSaving,
    welcomeBonus,
    confidence,
    timingAdvice: getTimingAdvice(answers.contract_end),
    savable: yearTwoSaving > 50,
    easeOfSwitch: 'medium',
    scenarios: buildEnergyScenarios(providers, kwh, m3, currentYearly),
  }
}

async function calculateBankSavings(answers, context) {
  const providers = await getProviders('bank', context)
  const currentMonthly = answers.monthly_fee ?? 2.5
  const freeOption = providers.find(p => p.monthlyFee === 0)
  if (!freeOption) return null

  const welcomeBonus = freeOption.welcomeBonus?.amount || 0
  const yearlySaving = (currentMonthly * 12) + welcomeBonus

  return {
    currentMonthly,
    suggestedProvider: freeOption.slug,
    suggestedProviderName: freeOption.name,
    yearlySaving: Math.round(yearlySaving),
    welcomeBonus,
    confidence: 0.9,
    timingAdvice: 'Je kunt direct overstappen — geen contract.',
    savable: yearlySaving > 20,
    easeOfSwitch: 'easy',
  }
}

async function calculateTelecomSavings(answers, context) {
  const benchmark = await getBenchmark('telecom', { ...context, internetSpeed: answers.internet_speed || 100 })
  const providers = await getProviders('telecom', context)
  const currentMonthly = benchmark?.internet || 50
  const speed = answers.internet_speed || 100

  const cheapest = providers
    .filter(p => p.minSpeed <= speed || speed === 0)
    .sort((a, b) => a.monthlyTotal - b.monthlyTotal)[0]

  if (!cheapest) return null
  const monthlySaving = Math.max(0, currentMonthly - cheapest.monthlyTotal)

  return {
    currentMonthly,
    suggestedProvider: cheapest.slug,
    suggestedProviderName: cheapest.name,
    yearlySaving: Math.round(monthlySaving * 12),
    welcomeBonus: cheapest.welcomeBonus?.amount || 0,
    confidence: 0.75,
    timingAdvice: getTimingAdvice(answers.contract_end),
    savable: monthlySaving * 12 > 60,
    easeOfSwitch: 'medium',
  }
}

async function calculateInsuranceSavings(answers, context) {
  const [benchmark, providers] = await Promise.all([
    getBenchmark('verzekering', context),
    getProviders('verzekering', context),
  ])

  // Zorgverzekering — vind goedkoopste aanbieder
  const currentHealth = answers.health_monthly || benchmark?.health || 145
  const cheapestProvider = providers
    .filter(p => p.monthlyHealth)
    .sort((a, b) => a.monthlyHealth - b.monthlyHealth)[0]

  // Aanvullende verzekering toeslag (aanvulling heeft een meerprijs)
  const addonPremium = { no: 0, basic: 8, extensive: 18, tandarts: 12 }[answers.health_addon] || 0
  const cheapestHealth = cheapestProvider
    ? cheapestProvider.monthlyHealth + addonPremium
    : currentHealth - 12

  const healthSaving = Math.max(0, currentHealth - cheapestHealth) * 12

  // Autoverzekering
  let carSaving = 0
  if (answers.has_car === 'yes') {
    const currentCar = answers.car_monthly || benchmark?.car || 65
    // Ouders auto = minder dekking nodig → grotere besparing
    const ageFactor = { '0-3': 0.92, '3-7': 0.82, '7-15': 0.73, '15+': 0.65 }[answers.car_age] || 0.82
    const cheapestCar = currentCar * ageFactor
    carSaving = Math.max(0, currentCar - cheapestCar) * 12
  }

  // Inboedel/opstal (alleen als eigenaar)
  let homeSaving = 0
  if (answers.has_home_insurance && answers.has_home_insurance !== 'no') {
    // Gemiddeld €18/mnd, goedkoopste ~€14/mnd
    homeSaving = Math.max(0, 18 - 14) * 12
  }

  const totalSaving = healthSaving + carSaving + homeSaving

  return {
    yearlySaving: Math.round(totalSaving),
    healthSaving: Math.round(healthSaving),
    carSaving: Math.round(carSaving),
    homeSaving: Math.round(homeSaving),
    suggestedProvider: cheapestProvider?.slug ?? 'cz',
    suggestedProviderName: cheapestProvider?.name ?? 'CZ',
    welcomeBonus: cheapestProvider?.welcomeBonus?.amount || 0,
    confidence: 0.70,
    timingAdvice: 'Zorgverzekering: alleen overstappen mogelijk in november–december.',
    savable: totalSaving > 60,
    easeOfSwitch: 'medium',
  }
}


async function calculateVPNSavings(answers, context) {
  if (answers.has_vpn !== 'yes') return null
  const providers = await getProviders('vpn', context)
  const cheapest = providers.sort((a, b) => a.priceMonthly - b.priceMonthly)[0]
  if (!cheapest) return null

  const currentMonthly = answers.vpn_cost || 8
  const monthlySaving = Math.max(0, currentMonthly - cheapest.priceMonthly)

  return {
    currentMonthly,
    suggestedProvider: cheapest.slug,
    suggestedProviderName: cheapest.name,
    yearlySaving: Math.round(monthlySaving * 12),
    welcomeBonus: 0,
    confidence: 0.95,
    timingAdvice: 'Zeg eerst op, dan abonneer je op de nieuwe.',
    savable: monthlySaving * 12 > 30,
    easeOfSwitch: 'easy',
  }
}

export function calculateScore(results, totalSavings) {
  if (totalSavings < 50)   return 9.5
  if (totalSavings < 200)  return 8.5
  if (totalSavings < 400)  return 7.5
  if (totalSavings < 700)  return 6.5
  if (totalSavings < 1000) return 5.5
  if (totalSavings < 1500) return 4.5
  return 3.5
}

export function sortByQuickWins(results) {
  const easeOrder = { easy: 0, medium: 1, hard: 2 }
  return Object.entries(results)
    .filter(([, r]) => r?.savable)
    .sort((a, b) => {
      const easeDiff = easeOrder[a[1].easeOfSwitch] - easeOrder[b[1].easeOfSwitch]
      if (easeDiff !== 0) return easeDiff
      return b[1].yearlySaving - a[1].yearlySaving
    })
}

export function formatEuro(amount) {
  return new Intl.NumberFormat('nl-NL', {
    style: 'currency', currency: 'EUR',
    minimumFractionDigits: 0, maximumFractionDigits: 0,
  }).format(amount)
}

// Legacy helper used by VPN comparator
export function calculateVPNSavingsLegacy(provider, plan = 'biennial') {
  const monthly = provider.price.monthly
  const chosen = provider.price[plan]
  return Math.round((monthly - chosen) * 24)
}
