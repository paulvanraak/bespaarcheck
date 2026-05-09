export default function Button({ children, variant = 'primary', className = '', onClick, type = 'button' }) {
  const base = 'inline-flex items-center gap-2 font-semibold rounded-md transition-colors'
  const variants = {
    primary: 'bg-primary-500 hover:bg-primary-600 text-white px-5 py-2.5',
    accent: 'bg-accent-500 hover:bg-accent-600 text-white px-5 py-2.5',
    outline: 'border border-ink-200 text-ink-700 hover:bg-ink-50 px-5 py-2.5',
  }

  return (
    <button type={type} onClick={onClick} className={`${base} ${variants[variant] ?? ''} ${className}`}>
      {children}
    </button>
  )
}
