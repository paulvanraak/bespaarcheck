// CBS-data en marktcijfers (peildatum 2026)
export const BENCHMARKS = {
  energie: ({ household = 2, housingType = 'apartment' } = {}) => {
    const baseKwh = { 1: 1900, 2: 2700, 3: 3500, 4: 4200, 5: 5000, 6: 5800 }[Math.min(household, 6)] || 2700
    const baseM3 = {
      apartment: { 1: 800, 2: 1100, 3: 1400, 4: 1600 },
      terraced:  { 1: 1100, 2: 1300, 3: 1500, 4: 1700 },
      semi:      { 1: 1300, 2: 1500, 3: 1700, 4: 1900 },
      detached:  { 1: 1700, 2: 2000, 3: 2300, 4: 2500 },
    }[housingType]?.[Math.min(household, 4)] || 1300
    const avgKwhRate = 0.32, avgM3Rate = 1.45, fixedFee = 35
    return {
      kwh: baseKwh, m3: baseM3,
      monthlyCost: Math.round(((baseKwh * avgKwhRate) + (baseM3 * avgM3Rate)) / 12 + fixedFee),
    }
  },
  telecom: ({ household = 2, internetSpeed = 100 } = {}) => {
    const internetBySpeed = { 50: 38, 100: 42, 250: 50, 500: 58, 1000: 65 }
    return {
      internet: internetBySpeed[internetSpeed] || 45,
      mobile: 22,
      total: (internetBySpeed[internetSpeed] || 45) + (22 * Math.min(household, 4)),
    }
  },
  verzekering: ({ age = 35 } = {}) => ({
    health: 145,
    car: age < 25 ? 95 : age < 35 ? 75 : 65,
    home: 18,
  }),
  bank: () => ({ monthlyFee: 2.50 }),
  vpn: () => ({ avgMonthly: 8, cheapestMonthly: 3.39 }),
}
