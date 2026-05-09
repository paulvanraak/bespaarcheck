export default function StarRating({ rating, reviewCount }) {
  const full = Math.floor(rating)
  const half = rating % 1 >= 0.5

  return (
    <div className="flex items-center gap-1.5">
      <div className="flex items-center gap-0.5">
        {Array.from({ length: 5 }).map((_, i) => (
          <span
            key={i}
            className={`material-symbols-rounded text-[14px] ${
              i < full
                ? 'text-amber-400'
                : i === full && half
                ? 'text-amber-300'
                : 'text-ink-200'
            }`}
            style={{ fontVariationSettings: "'FILL' 1" }}
          >
            star
          </span>
        ))}
      </div>
      <span className="text-xs text-ink-400">
        {rating.toFixed(1)} ({reviewCount?.toLocaleString('nl-NL')})
      </span>
    </div>
  )
}
