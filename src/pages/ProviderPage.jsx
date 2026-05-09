import { useParams, Navigate, Link } from 'react-router-dom'
import { CATEGORIES } from '../data/categories'
import { BANKING_PROVIDERS } from '../data/providers/banking'
import PageContainer from '../components/layout/PageContainer'
import StarRating from '../components/shared/StarRating'
import Icon from '../components/shared/Icon'
import AffiliateCTA from '../components/provider/AffiliateCTA'
import AffiliateDisclosure from '../components/shared/AffiliateDisclosure'
import { formatEuro } from '../services/savings'

const PROVIDERS_MAP = {
  bankrekening: BANKING_PROVIDERS,
  'vpn-hosting': BANKING_PROVIDERS,
}

export default function ProviderPage() {
  const { category: catSlug, provider: provSlug } = useParams()
  const category = CATEGORIES.find(c => c.slug === catSlug)
  const providers = PROVIDERS_MAP[catSlug] ?? []
  const provider = providers.find(p => p.slug === provSlug)

  if (!category || !provider) return <Navigate to="/" replace />

  return (
    <PageContainer className="py-10 max-w-2xl">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-ink-400 mb-6">
        <Link to={`/vergelijk/${catSlug}`} className="hover:text-ink-700 transition-colors">
          {category.name}
        </Link>
        <Icon name="chevron_right" className="text-[16px]" />
        <span className="text-ink-700 font-medium">{provider.name}</span>
      </div>

      {/* Header */}
      <div className="flex items-center gap-4 mb-6">
        <div
          className="w-16 h-16 rounded-xl flex items-center justify-center text-white text-xl font-bold flex-shrink-0"
          style={{ backgroundColor: provider.logoColor }}
        >
          {provider.logo}
        </div>
        <div>
          <h1 className="text-2xl font-bold text-ink-900">{provider.name}</h1>
          <StarRating rating={provider.rating} reviewCount={provider.reviewCount} />
        </div>
        <div className="ml-auto text-right">
          <p className="text-2xl font-bold text-ink-900">
            {provider.monthlyFee === 0 ? 'Gratis' : `${formatEuro(provider.monthlyFee)}/mnd`}
          </p>
        </div>
      </div>

      {/* Features */}
      <div className="bg-white border border-ink-100 rounded-xl p-6 mb-6">
        <h2 className="font-bold text-ink-900 mb-4">Wat je krijgt</h2>
        <ul className="space-y-2.5">
          {provider.features.map((f, i) => (
            <li key={i} className="flex items-start gap-2.5 text-sm text-ink-700">
              <Icon name="check" className="text-success text-[18px] mt-0.5 flex-shrink-0" />
              {f}
            </li>
          ))}
        </ul>
      </div>

      {/* CTA */}
      <AffiliateCTA provider={provider} category={category} />
    </PageContainer>
  )
}
