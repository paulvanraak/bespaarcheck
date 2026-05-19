// This file is superseded by CategoryGrid.astro which renders cards inline
// Do not import this directly
import Icon from '../shared/Icon'

const COLOR_MAP = {
  blue:   { icon: 'text-blue-600 bg-blue-50',    hover: 'hover:border-blue-200' },
  pink:   { icon: 'text-pink-500 bg-pink-50',     hover: 'hover:border-pink-200' },
  red:    { icon: 'text-red-500 bg-red-50',       hover: 'hover:border-red-200' },
  purple: { icon: 'text-purple-500 bg-purple-50', hover: 'hover:border-purple-200' },
  amber:  { icon: 'text-amber-500 bg-amber-50',   hover: 'hover:border-amber-200' },
  green:  { icon: 'text-green-600 bg-green-50',   hover: 'hover:border-green-200' },
}

export default function CategoryCard({ category }) {
  const { slug, name, tagline, icon, color, available } = category
  const colors = COLOR_MAP[color] ?? { icon: 'text-primary-500 bg-primary-50', hover: 'hover:border-primary-200' }

  if (!available) {
    return (
      <div className="bg-white border border-ink-100 rounded-md p-5 opacity-50 cursor-not-allowed select-none">
        <div className="flex items-start justify-between mb-3">
          <div className="w-11 h-11 rounded-md bg-ink-100 flex items-center justify-center">
            <Icon name={icon} className="text-ink-300 text-[22px]" />
          </div>
          <span className="text-xs font-semibold bg-ink-100 text-ink-400 px-2 py-1 rounded-sm tracking-wide">
            Binnenkort
          </span>
        </div>
        <h3 className="font-semibold text-ink-700 mb-1">{name}</h3>
        <p className="text-sm text-ink-300 line-clamp-2">{tagline}</p>
      </div>
    )
  }

  return (
    <a
      href={`/bespaarcheck/vergelijk/${slug}/`}
      className={`bg-white border border-ink-100 rounded-md p-5 hover:shadow-md transition-all group block ${colors.hover}`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className={`w-11 h-11 rounded-md flex items-center justify-center transition-colors ${colors.icon}`}>
          <Icon name={icon} className="text-[22px]" />
        </div>
        <Icon name="arrow_forward" className="text-ink-300 text-[18px] group-hover:text-ink-600 transition-colors" />
      </div>
      <h3 className="text-lg font-semibold text-ink-900 mb-1">{name}</h3>
      <p className="text-sm text-ink-500 line-clamp-2">{tagline}</p>
    </a>
  )
}
