import { useCallback, type MouseEvent } from 'react'
import type { SymbolId } from './symbols'
import { SYMBOLS } from './symbols'

type DialRingProps = {
  symbolIds: SymbolId[]
  rotation: number
  size: number
  thickness: number
  onRotate: () => void
  label: string
  zIndex: number
}

export function DialRing({
  symbolIds,
  rotation,
  size,
  thickness,
  onRotate,
  label,
  zIndex,
}: DialRingProps) {
  const segmentAngle = 360 / symbolIds.length
  const radius = size / 2
  const innerRadius = radius - thickness

  const handleClick = useCallback(
    (event: MouseEvent) => {
      event.stopPropagation()
      onRotate()
    },
    [onRotate],
  )

  return (
    <div
      className="dial-ring"
      style={{ width: size, height: size, zIndex }}
    >
      <div
        className="dial-ring__rotator"
        style={{ transform: `rotate(${rotation}deg)` }}
      >
        <svg
          className="dial-ring__svg"
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
        >
          <circle
            cx={radius}
            cy={radius}
            r={radius - thickness / 2}
            className="dial-ring__hit"
            strokeWidth={thickness + 8}
            fill="none"
            role="button"
            tabIndex={0}
            aria-label={`Rotate ${label} ring`}
            onClick={handleClick}
            onKeyDown={(event) => {
              if (event.key === 'Enter' || event.key === ' ') {
                event.preventDefault()
                onRotate()
              }
            }}
          />
          <circle
            cx={radius}
            cy={radius}
            r={radius - thickness / 2}
            className="dial-ring__track"
            strokeWidth={thickness}
            fill="none"
          />
          {symbolIds.map((id, index) => {
            const angle = index * segmentAngle - 90
            const rad = (angle * Math.PI) / 180
            const symbolRadius = innerRadius + thickness * 0.45
            const x = radius + symbolRadius * Math.cos(rad)
            const y = radius + symbolRadius * Math.sin(rad)
            const symbol = SYMBOLS[id]

            return (
              <g
                key={`${id}-${index}`}
                transform={`translate(${x}, ${y}) rotate(${angle + 90})`}
                className="dial-ring__symbol"
              >
                <title>{symbol.label}</title>
                <foreignObject x="-12" y="-12" width="24" height="24">
                  <div className="dial-ring__icon">{symbol.icon}</div>
                </foreignObject>
              </g>
            )
          })}
        </svg>
      </div>
      <span className="dial-ring__hint">{label}</span>
    </div>
  )
}
