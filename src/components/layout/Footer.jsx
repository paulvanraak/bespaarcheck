import { useLocation, Link } from 'react-router-dom'
import Logo from '../shared/Logo'
import AffiliateDisclosure from '../shared/AffiliateDisclosure'

export default function Footer() {
  const location = useLocation()
  const isCheckFlow = location.pathname.startsWith('/check')

  return (
    <>
      {/* Footer — verberg op check-flow */}
      {!isCheckFlow && (
        <footer className="border-t border-ink-100 bg-white mt-16">
          <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10">
            <div className="flex flex-col md:flex-row justify-between gap-6">
              <div>
                <Logo className="text-base" />
                <p className="text-sm text-ink-500 mt-2 max-w-xs">
                  Persoonlijke bespaarcheck + vergelijker voor energie, bank, telecom en meer.
                </p>
              </div>
              <div className="flex flex-wrap gap-4 sm:gap-6 text-sm text-ink-500">
                <Link to="/methode" className="hover:text-ink-700">Methodologie</Link>
                <Link to="/privacy" className="hover:text-ink-700">Privacybeleid</Link>
                <Link to="/voorwaarden" className="hover:text-ink-700">Voorwaarden</Link>
                <a href="mailto:info@bespaarcheck.com" className="hover:text-ink-700">Contact</a>
              </div>
            </div>
            <AffiliateDisclosure />
            <p className="text-xs text-ink-300 text-center mt-2">© 2026 BespaarCheck</p>
          </div>
        </footer>
      )}
    </>
  )
}
