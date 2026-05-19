import { useEffect } from 'react'
import { CompareProvider } from '../../context/CompareContext'
import { CATEGORIES } from '../../data/categories'
import { BANKING_PROVIDERS } from '../../data/providers/banking'
import ComparePage from './ComparePage'

const PROVIDERS_MAP = {
  bankrekening: BANKING_PROVIDERS,
  'vpn-hosting': BANKING_PROVIDERS, // fallback until VPN data exists
}

function CategoryPageInner({ slug }) {
  const category = CATEGORIES.find(c => c.slug === slug)

  useEffect(() => {
    if (!category || !category.available) {
      window.location.href = '/bespaarcheck/'
    }
  }, [category])

  if (!category || !category.available) return null

  const providers = PROVIDERS_MAP[slug] ?? []

  return <ComparePage category={category} providers={providers} />
}

export default function CategoryApp({ slug }) {
  return (
    <CompareProvider>
      <CategoryPageInner slug={slug} />
    </CompareProvider>
  )
}
