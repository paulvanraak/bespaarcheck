import { ENERGY_PROVIDERS } from './providers/energy'
import { BANKING_PROVIDERS } from './providers/banking'
import { TELECOM_PROVIDERS } from './providers/telecom'
import { INSURANCE_PROVIDERS } from './providers/insurance'
import { INVESTING_PROVIDERS } from './providers/investing'
import { VPN_PROVIDERS } from './providers/vpn'
import { BENCHMARKS } from './benchmarks'

const PROVIDERS_BY_CATEGORY = {
  energie: ENERGY_PROVIDERS,
  bank: BANKING_PROVIDERS,
  bankrekening: BANKING_PROVIDERS,
  telecom: TELECOM_PROVIDERS,
  verzekering: INSURANCE_PROVIDERS,
  beleggen: INVESTING_PROVIDERS,
  vpn: VPN_PROVIDERS,
  'vpn-hosting': VPN_PROVIDERS,
}

const TARIFFS_LAST_UPDATE = '2026-05-09'

export async function getProviders(category, context = {}) {
  const providers = PROVIDERS_BY_CATEGORY[category] || []
  return providers
    .filter(p => isAvailableInContext(p, context))
    .map(p => personalizeForContext(p, context))
}

export async function getBenchmark(category, context = {}) {
  return BENCHMARKS[category]?.(context) ?? null
}

export function getTariffsLastUpdate() {
  return TARIFFS_LAST_UPDATE
}

function isAvailableInContext(provider, context) {
  if (provider.regions && context.postcode) {
    const region = postcodeToRegion(context.postcode)
    if (!provider.regions.includes(region)) return false
  }
  return true
}

function personalizeForContext(provider, context) {
  return { ...provider }
}

function postcodeToRegion(postcode) {
  const num = parseInt(String(postcode).substring(0, 2))
  if (num >= 10 && num <= 19) return 'noord-holland'
  if (num >= 20 && num <= 29) return 'zuid-holland'
  if (num >= 30 && num <= 39) return 'utrecht'
  if (num >= 40 && num <= 49) return 'brabant'
  if (num >= 50 && num <= 59) return 'limburg'
  if (num >= 60 && num <= 69) return 'gelderland-oost'
  if (num >= 70 && num <= 79) return 'gelderland-west'
  if (num >= 80 && num <= 89) return 'overijssel'
  if (num >= 90 && num <= 99) return 'noord'
  return 'unknown'
}
