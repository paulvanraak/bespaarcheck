import { useMemo } from 'react'
import ProviderRow from './ProviderRow'
import PageContainer from '../layout/PageContainer'
import AffiliateDisclosure from '../shared/AffiliateDisclosure'

const COLOR_MAP = {
  blue:   'text-blue-600 bg-blue-50',
  pink:   'text-pink-500 bg-pink-50',
  red:    'text-red-500 bg-red-50',
  purple: 'text-purple-500 bg-purple-50',
  amber:  'text-amber-500 bg-amber-50',
  green:  'text-green-600 bg-green-50',
}

export default function ComparePage({ category, providers }) {
  // rerender-memo: sort alleen opnieuw als providers verandert
  const sorted = useMemo(
    () => [...providers].sort((a, b) => (b.bestChoice ? 1 : 0) - (a.bestChoice ? 1 : 0)),
    [providers]
  )

  const iconCls = COLOR_MAP[category.color] ?? 'text-primary-500 bg-primary-50'

  return (
    <PageContainer className="py-10">
      {/* Categorie-header met gekleurde icon */}
      <div className="flex items-center gap-4 mb-8">
        <div className={`w-14 h-14 rounded-xl flex items-center justify-center flex-shrink-0 ${iconCls}`}>
          <span className="material-symbols-rounded text-2xl">{category.icon}</span>
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-ink-900 leading-tight">{category.name}</h1>
          <p className="text-ink-500 mt-0.5">{category.description}</p>
        </div>
      </div>

      <div className="space-y-4">
        {sorted.map(provider => (
          <ProviderRow key={provider.slug} provider={provider} category={category} />
        ))}
      </div>
      <AffiliateDisclosure />
    </PageContainer>
  )
}
