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

export const SYMBOLS: Record<SymbolId, DialSymbol> = {
  containment: {
    id: 'containment',
    label: 'Containment',
    icon: (
      <svg {...iconProps}>
        <rect x="5" y="5" width="14" height="14" rx="2" />
        <path d="M9 12h6M12 9v6" />
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
}
