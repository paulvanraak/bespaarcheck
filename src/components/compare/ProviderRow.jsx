import StarRating from '../shared/StarRating'
import Icon from '../shared/Icon'
import { formatEuro } from '../../services/savings'

export default function ProviderRow({ provider, category }) {
  const isVPN = !!provider.price
  const price = isVPN ? provider.price.biennial : provider.monthlyFee

  return (
    <a
      href={`/bespaarcheck/aanbieder/${category.slug}/${provider.slug}/`}
      className={`block bg-white border rounded-xl overflow-hidden hover:shadow-md transition-all ${
        provider.bestChoice
          ? 'border-success ring-1 ring-success/20'
          : 'border-ink-100 hover:border-primary-200'
      }`}
    >
      {/* Beste keuze top-banner */}
      {provider.bestChoice && (
        <div className="bg-success/10 border-b border-success/20 px-5 py-2 flex items-center gap-2">
          <span className="material-symbols-rounded text-success text-sm">verified</span>
          <span className="text-xs font-bold text-success uppercase tracking-widest">Beste keuze</span>
        </div>
      )}

      <div className="p-5">
        {/* Row 1: logo + naam + prijs */}
        <div className="flex items-center gap-3 mb-1">
          <div
            className="w-11 h-11 rounded-xl flex items-center justify-center text-white text-sm font-bold flex-shrink-0"
            style={{ backgroundColor: provider.logoColor }}
          >
            {provider.logo}
          </div>
          <h3 className="font-bold text-ink-900 text-lg flex-1 min-w-0">{provider.name}</h3>
          <div className="text-right flex-shrink-0">
            {isVPN ? (
              <p className="text-xl font-bold text-ink-900 leading-none">
                {formatEuro(price)}<span className="text-sm font-normal text-ink-400">/mnd</span>
              </p>
            ) : (
              <p className="text-xl font-bold text-ink-900 leading-none">
                {price === 0 ? 'Gratis' : `${formatEuro(price)}/mnd`}
              </p>
            )}
          </div>
        </div>

        {/* Row 2: sterren + bonus */}
        <div className="flex items-center justify-between mb-4 pl-14">
          <StarRating rating={provider.rating} reviewCount={provider.reviewCount} />
          {!isVPN && provider.bonus > 0 && (
            <span className="text-xs text-success font-semibold">+€{provider.bonus} bonus</span>
          )}
          {isVPN && (
            <span className="text-xs text-ink-300">2-jaar abonnement</span>
          )}
        </div>

        {/* Features */}
        <ul className="space-y-1.5">
          {provider.features.slice(0, 3).map((f, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-ink-600">
              <Icon name="check" className="text-success text-[16px] mt-0.5 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="mt-4 pt-4 border-t border-ink-100 flex items-center justify-between">
          <span className="text-xs text-ink-400">Bekijk alle details</span>
          <span className="inline-flex items-center gap-1.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors">
            Bekijk aanbieder
            <Icon name="arrow_forward" className="text-[14px]" />
          </span>
        </div>
      </div>
    </a>
  )
}
