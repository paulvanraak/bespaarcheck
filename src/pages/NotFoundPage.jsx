import { Link } from 'react-router-dom'
import PageContainer from '../components/layout/PageContainer'

export default function NotFoundPage() {
  return (
    <PageContainer className="py-20 text-center">
      <p className="text-6xl mb-4">🔍</p>
      <h1 className="text-2xl font-bold text-ink-900 mb-2">Pagina niet gevonden</h1>
      <p className="text-ink-500 mb-6">De pagina die je zoekt bestaat niet of is verplaatst.</p>
      <Link
        to="/"
        className="inline-flex items-center gap-2 bg-primary-500 hover:bg-primary-600 text-white font-semibold px-6 py-3 rounded-md transition-colors"
      >
        Terug naar home
      </Link>
    </PageContainer>
  )
}
