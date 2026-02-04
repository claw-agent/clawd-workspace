/**
 * PawDivider - Subtle paw print decorative element
 * Use sparingly as section dividers or decorative accents
 */

interface PawDividerProps {
  variant?: 'line' | 'scattered' | 'corner'
  className?: string
  color?: 'forest' | 'pink' | 'beige'
}

export function PawDivider({ 
  variant = 'line', 
  className = '',
  color = 'forest'
}: PawDividerProps) {
  const colorClasses = {
    forest: 'text-forest/20',
    pink: 'text-pink',
    beige: 'text-beige',
  }

  if (variant === 'line') {
    return (
      <div className={`flex items-center justify-center gap-4 py-8 ${className}`}>
        <div className={`h-px flex-1 bg-current ${colorClasses[color]}`} />
        <span className={`text-2xl ${colorClasses[color]}`}>🐾</span>
        <span className={`text-xl ${colorClasses[color]} opacity-70`}>🐾</span>
        <span className={`text-2xl ${colorClasses[color]}`}>🐾</span>
        <div className={`h-px flex-1 bg-current ${colorClasses[color]}`} />
      </div>
    )
  }

  if (variant === 'scattered') {
    return (
      <div className={`relative h-16 overflow-hidden ${className}`}>
        <span className={`absolute left-[10%] top-2 text-lg ${colorClasses[color]} opacity-40 rotate-[-15deg]`}>🐾</span>
        <span className={`absolute left-[30%] top-6 text-xl ${colorClasses[color]} opacity-30 rotate-[10deg]`}>🐾</span>
        <span className={`absolute left-[50%] top-1 text-lg ${colorClasses[color]} opacity-50`}>🐾</span>
        <span className={`absolute left-[70%] top-5 text-xl ${colorClasses[color]} opacity-35 rotate-[-10deg]`}>🐾</span>
        <span className={`absolute left-[90%] top-3 text-lg ${colorClasses[color]} opacity-45 rotate-[15deg]`}>🐾</span>
      </div>
    )
  }

  // Corner variant - for card decorations
  return (
    <span className={`absolute text-xl ${colorClasses[color]} opacity-30 ${className}`}>
      🐾
    </span>
  )
}

/**
 * PawTrail - Animated trail of paw prints
 * Use for hero sections or special callouts
 */
export function PawTrail({ className = '' }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {[...Array(5)].map((_, i) => (
        <span 
          key={i}
          className="text-forest/20 animate-bounce-slow"
          style={{ 
            animationDelay: `${i * 0.15}s`,
            fontSize: `${1.2 - i * 0.1}rem`,
            opacity: 1 - i * 0.15 
          }}
        >
          🐾
        </span>
      ))}
    </div>
  )
}
