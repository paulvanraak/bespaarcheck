import { useParams, Navigate } from 'react-router-dom'
import { CATEGORIES } from '../data/categories'
import { BANKING_PROVIDERS } from '../data/providers/banking'
import ComparePage from '../components/compare/ComparePage'

const PROVIDERS_MAP = {
  bankrekening: BANKING_PROVIDERS,
  'vpn-hosting': BANKING_PROVIDERS, // fallback until VPN data exists
}

export default function CategoryPage() {
  const { category: slug } = useParams()
  const category = CATEGORIES.find(c => c.slug === slug)

  if (!category || !category.available) return <Navigate to="/" replace />

  const providers = PROVIDERS_MAP[slug] ?? []

  return <ComparePage category={category} providers={providers} />
}
