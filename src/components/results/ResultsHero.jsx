import { formatEuro } from '../../services/savings'
import ScoreBadge from './ScoreBadge'

export default function ResultsHero({ totalSavings, score }) {
  const monthly = Math.round(totalSavings / 12)

  return (
    <div className="bg-primary-500 rounded-2xl overflow-hidden mb-8">
      <div className="p-6 sm:p-8">
        <p className="text-primary-200 text-xs font-semibold uppercase tracking-widest mb-3">
          Jouw potentiële besparing
        </p>

        <div className="flex items-start justify-between gap-6 flex-wrap">
          <div>
            <div className="flex items-baseline gap-2.5">
              <div className="text-6xl sm:text-7xl font-bold text-white leading-none tracking-tight">
                {formatEuro(totalSavings)}
              </div>
              <span className="text-primary-200 text-2xl font-medium">/jaar</span>
            </div>
            <div className="text-primary-200 text-xl mt-2">
              <span className="text-white font-medium">{formatEuro(monthly)}/maand</span>
            </div>
          </div>
          <div className="bg-white/10 rounded-xl p-4 text-center backdrop-blur-sm">
            <ScoreBadge score={score} />
          </div>
        </div>
      </div>

    </div>
  )
}
