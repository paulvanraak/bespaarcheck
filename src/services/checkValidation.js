import { BENCHMARKS } from './tariffs/benchmarks'

/**
 * Voert een sanity-check uit op de antwoorden voordat resultaten getoond worden.
 * Geeft een lijst met waarschuwingen terug die de gebruiker kan zien.
 */
export function validateAnswers(answers) {
  const warnings = []
  const context = answers.context || {}

  // --- Energie ---
  if (context.household && answers.energie?.kwh) {
    const benchmark = BENCHMARKS.energie({
      household: context.household,
      housingType: context.housingType,
    })
    // Verbruik > 2× benchmark is opvallend hoog
    if (answers.energie.kwh > benchmark.kwh * 2) {
      warnings.push({
        category: 'energie',
        type: 'high_kwh',
        message: `Je stroomverbruik (${answers.energie.kwh} kWh) lijkt hoog voor jouw situatie. Klopt dit? Staat op je jaarafrekening.`,
      })
    }
    // Verbruik < 500 kWh is onwaarschijnlijk tenzij veel zonnepanelen
    if (answers.energie.kwh < 500 && answers.energie.has_solar !== 'yes_many') {
      warnings.push({
        category: 'energie',
        type: 'low_kwh',
        message: `Je stroomverbruik (${answers.energie.kwh} kWh) lijkt heel laag. Wil je dit controleren?`,
      })
    }
    // Gas > 3.500 m³ is onwaarschijnlijk voor niet-vrijstaande woningen
    if (answers.energie.m3 > 3500 && context.housingType !== 'detached') {
      warnings.push({
        category: 'energie',
        type: 'high_m3',
        message: `Je gasverbruik (${answers.energie.m3} m³) is hoog voor een ${housingTypeLabel(context.housingType)}. Klopt dit?`,
      })
    }
  }

  // --- Zorgverzekering ---
  if (answers.verzekering?.health_monthly) {
    const health = answers.verzekering.health_monthly
    if (health < 100) {
      warnings.push({
        category: 'verzekering',
        type: 'low_health',
        message: `Een zorgpremie van €${health}/mnd lijkt erg laag. De minimale basispremie in 2026 is ca. €110/mnd.`,
      })
    }
    if (health > 250) {
      warnings.push({
        category: 'verzekering',
        type: 'high_health',
        message: `Een zorgpremie van €${health}/mnd is hoog. Heb je naast de basispremie ook aanvullende verzekering?`,
      })
    }
  }

  // --- Autoverzekering ---
  if (answers.verzekering?.has_car === 'yes' && answers.verzekering?.car_monthly) {
    const car = answers.verzekering.car_monthly
    if (car < 15) {
      warnings.push({
        category: 'verzekering',
        type: 'low_car',
        message: `Een autoverzekering van €${car}/mnd lijkt laag. Klopt dit?`,
      })
    }
  }

  return warnings
}

/**
 * Detecteert of een check-record afkomstig is van vóór de accuracy-upgrade.
 * Legacy checks missen het `context` veld in de antwoorden.
 */
export function isLegacyCheck(check) {
  if (!check?.answers) return false
  return !check.answers.context
}

function housingTypeLabel(type) {
  const labels = {
    apartment: 'appartement',
    terraced:  'tussenwoning',
    semi:      'hoekwoning',
    detached:  'vrijstaande woning',
  }
  return labels[type] || 'woning'
}
