import { useState } from 'react'
import { formatEuro } from '../../services/savings'
import { supabase } from '../../services/supabase'
import { useUser } from '../../context/UserContext'
import ConfidenceBadge from './ConfidenceBadge'

const CATEGORY_META = {
  energie:     { icon: 'bolt',           label: 'Energie',           slug: 'energie',      iconCls: 'text-red-500 bg-red-50' },
  bank:        { icon: 'account_balance', label: 'Bankrekening',     slug: 'bankrekening', iconCls: 'text-blue-500 bg-blue-50' },
  telecom:     { icon: 'smartphone',     label: 'Internet & mobiel', slug: 'telecom',      iconCls: 'text-purple-500 bg-purple-50' },
  verzekering: { icon: 'shield',         label: 'Verzekeringen',     slug: 'verzekering',  iconCls: 'text-amber-500 bg-amber-50' },
  vpn:         { icon: 'language',       label: 'VPN',               slug: 'vpn-hosting',  iconCls: 'text-pink-500 bg-pink-50' },
}

export default function ResultCategoryCard({ category, result, checkId }) {
  const [done, setDone] = useState(false)
  const [marking, setMarking] = useState(false)
  const { user } = useUser()
  const meta = CATEGORY_META[category] ?? { icon: 'savings', label: category, slug: category, iconCls: 'text-primary-500 bg-primary-50' }

  async function markDone() {
    setMarking(true)
    if (user?.id) {
      await supabase.from('actions').insert({
        user_id: user.id,
        check_id: checkId !== 'local' ? checkId : null,
        category, action_type: 'marked_done',
      }).catch(() => {})
    }
    setDone(true)
    setMarking(false)
  }

  return (
    <div className={[
      'bg-white rounded-xl border p-5 transition-colors',
      done ? 'border-success/40 bg-successBg' : 'border-ink-100',
    ].join(' ')}>

      {/* Header row */}
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex items-center gap-3 min-w-0">
          <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${meta.iconCls}`}>
            <span className="material-symbols-rounded text-xl">{meta.icon}</span>
          </div>
          <div className="min-w-0">
            <div className="text-lg font-bold text-ink-900 leading-tight">{meta.label}</div>
            {result.confidence && (
              <div className="mt-0.5">
                <ConfidenceBadge value={result.confidence} />
              </div>
            )}
          </div>
        </div>
        <div className="text-right flex-shrink-0">
          <div className="text-2xl font-bold text-primary-500 leading-none">{formatEuro(result.yearlySaving)}</div>
          <div className="text-xs text-ink-400 mt-0.5">per jaar</div>
        </div>
      </div>

      {/* Welcome bonus */}
      {result.welcomeBonus > 0 && (
        <div className="flex items-center gap-1.5 text-xs text-success font-medium mb-3">
          <span className="material-symbols-rounded text-sm">celebration</span>
          Inclusief €{result.welcomeBonus} welkomstbonus eerste jaar
        </div>
      )}

      {/* Timing advice */}
      {result.timingAdvice && (
        <div className="flex items-start gap-2 text-xs text-ink-500 bg-ink-50 rounded-lg px-3 py-2 mb-3">
          <span className="material-symbols-rounded text-sm text-ink-400 flex-shrink-0 mt-0.5">schedule</span>
          {result.timingAdvice}
        </div>
      )}

      {/* Acties */}
      {done ? (
        <div className="flex items-center gap-2 text-success text-sm font-medium py-2">
          <span className="material-symbols-rounded text-lg">check_circle</span>
          Goed bezig — {formatEuro(result.yearlySaving)}/jaar bespaard
        </div>
      ) : (
        <div className="flex gap-2">
          <a
            href={`/bespaarcheck/vergelijk/${meta.slug}/`}
            className="flex-1 flex items-center justify-center py-2.5 rounded-lg bg-accent-500 hover:bg-accent-600 text-white text-sm font-semibold transition-colors"
          >
            Vergelijk aanbieders
          </a>
          <button
            onClick={markDone}
            disabled={marking}
            className="flex-1 py-2.5 rounded-lg border border-ink-100 text-ink-500 hover:border-success hover:text-success text-sm font-medium transition-colors flex items-center justify-center gap-1.5"
          >
            <span className="material-symbols-rounded text-base">check</span>
            Overgestapt
          </button>
        </div>
      )}
    </div>
  )
}
