import type { ReactNode } from 'react'

export type SymbolId =
  | 'containment'
  | 'judgment'
  | 'memory'
  | 'endurance'
  | 'star'
  | 'moon'
  | 'sun'
  | 'spiral'
  | 'diamond'
  | 'triangle'
  | 'circle'
  | 'cross'
  | 'eye'
  | 'rune'

export type DialSymbol = {
  id: SymbolId
  label: string
  icon: ReactNode
}

const iconProps = {
  viewBox: '0 0 24 24',
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.75,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
}

const CONTAINMENT_ARROW_PATH =
  'm64.7 30.6v24h-5.08l8.08 14 8.08-14h-5.08l-.000265-24h-5.99'

const CONTAINMENT_OUTER_PATH =
  'm51.9 11.9h31.7l3.07 11.4.944.391c19.4 8.03 32 26.9 32 47.9 0 2.26-.149 4.53-.445 6.77l-.133 1.01 8.37 8.37-15.8 27.4-11.4-3.06-.809.623c-9.06 6.95-20.2 10.7-31.6 10.7-11.4 6e-5-22.5-3.77-31.6-10.7l-.81-.623-11.4 3.06-15.8-27.4 8.37-8.37-.133-1.01c-.296-2.25-.445-4.51-.445-6.77.000141-21 12.6-39.9 32-47.9l.944-.391z'

export const SYMBOLS: Record<SymbolId, DialSymbol> = {
  containment: {
    id: 'containment',
    label: 'Containment',
    icon: (
      <svg viewBox="0 0 135 135" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle
          cx="67.7"
          cy="71.5"
          r="33"
          stroke="currentColor"
          strokeWidth="var(--containment-stroke-heavy, 6)"
        />
        <path
          d={CONTAINMENT_OUTER_PATH}
          stroke="currentColor"
          strokeWidth="var(--containment-stroke-light, 4)"
        />
        {[0, 120, 240].map((angle) => (
          <path
            key={angle}
            d={CONTAINMENT_ARROW_PATH}
            fill="currentColor"
            stroke="none"
            transform={`rotate(${angle} 67.7 71.5)`}
          />
        ))}
      </svg>
    ),
  },
  judgment: {
    id: 'judgment',
    label: 'Judgment',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3v18" />
        <path d="M5 7h14" />
        <path d="M7 7l-2 6h4l-2-6z" />
        <path d="M17 7l-2 6h4l-2-6z" />
      </svg>
    ),
  },
  memory: {
    id: 'memory',
    label: 'Memory',
    icon: (
      <svg {...iconProps}>
        <path d="M4 8c0-2 2-4 5-4s5 2 5 4-2 4-5 4" />
        <path d="M20 16c0 2-2 4-5 4s-5-2-5-4 2-4 5-4" />
        <circle cx="9" cy="8" r="1" fill="currentColor" stroke="none" />
        <circle cx="15" cy="16" r="1" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
  endurance: {
    id: 'endurance',
    label: 'Endurance',
    icon: (
      <svg {...iconProps}>
        <path d="M4 18l6-12 4 8 3-6 3 10" />
        <path d="M4 18h16" />
      </svg>
    ),
  },
  star: {
    id: 'star',
    label: 'Star',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l2.4 5.8L21 10l-5 3.6L17.5 20 12 16.5 6.5 20 8 13.6 3 10l6.6-1.2L12 3z" />
      </svg>
    ),
  },
  moon: {
    id: 'moon',
    label: 'Moon',
    icon: (
      <svg {...iconProps}>
        <path d="M20 14a8 8 0 1 1-8-8 6 6 0 0 0 8 8z" />
      </svg>
    ),
  },
  sun: {
    id: 'sun',
    label: 'Sun',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
      </svg>
    ),
  },
  spiral: {
    id: 'spiral',
    label: 'Spiral',
    icon: (
      <svg {...iconProps}>
        <path d="M12 12c0-3 2-5 5-5s5 2 5 5-2 5-5 5-3 2-5 5" />
      </svg>
    ),
  },
  diamond: {
    id: 'diamond',
    label: 'Diamond',
    icon: (
      <svg {...iconProps}>
        <path d="M12 3l8 9-8 9-8-9 8-9z" />
      </svg>
    ),
  },
  triangle: {
    id: 'triangle',
    label: 'Triangle',
    icon: (
      <svg {...iconProps}>
        <path d="M12 4l8 16H4L12 4z" />
      </svg>
    ),
  },
  circle: {
    id: 'circle',
    label: 'Circle',
    icon: (
      <svg {...iconProps}>
        <circle cx="12" cy="12" r="7" />
      </svg>
    ),
  },
  cross: {
    id: 'cross',
    label: 'Cross',
    icon: (
      <svg {...iconProps}>
        <path d="M12 4v16M4 12h16" />
      </svg>
    ),
  },
  eye: {
    id: 'eye',
    label: 'Eye',
    icon: (
      <svg {...iconProps}>
        <path d="M2 12s3.5-7 10-7 10 7 10 7-3.5 7-10 7-10-7-10-7z" />
        <circle cx="12" cy="12" r="2.5" />
      </svg>
    ),
  },
  rune: {
    id: 'rune',
    label: 'Elven Rune',
    icon: (
      <svg {...iconProps}>
        <path d="M12 4v16" />
        <path d="M12 5.5c4.5 0 7 2.5 7 5.8s-2.5 5.7-7 5.7" />
        <path d="M12 14.5c-3.5 0-6 2.2-6 5s2.5 4.5 6 4.5" />
        <path d="M6 19.5c2 1.2 4 1.5 6 0.5" />
        <circle cx="12" cy="3" r="0.9" fill="currentColor" stroke="none" />
      </svg>
    ),
  },
}
