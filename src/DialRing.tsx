import { useCallback, type CSSProperties, type MouseEvent } from 'react'
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
            const symbolRadius = innerRadius + thickness * 0.5
            const x = radius + symbolRadius * Math.cos(rad)
            const y = radius + symbolRadius * Math.sin(rad)
            const symbol = SYMBOLS[id]
            const iconSize = Math.round(thickness * 0.82)
            const targetStroke = label === 'outer' ? 2.15 : 2.35
            const symbolStroke = (targetStroke * 24) / iconSize
            const containmentStrokeHeavy = (1.45 * 135) / iconSize
            const containmentStrokeLight = (1.1 * 135) / iconSize

            return (
              <g
                key={`${id}-${index}`}
                transform={`translate(${x}, ${y}) rotate(${angle + 90})`}
                className="dial-ring__symbol"
              >
                <title>{symbol.label}</title>
                <foreignObject
                  x={-iconSize / 2}
                  y={-iconSize / 2}
                  width={iconSize}
                  height={iconSize}
                >
                  <div
                    className="dial-ring__icon"
                    style={{
                      width: iconSize,
                      height: iconSize,
                      '--symbol-stroke': symbolStroke,
                      '--containment-stroke-heavy': containmentStrokeHeavy,
                      '--containment-stroke-light': containmentStrokeLight,
                    } as CSSProperties}
                  >
                    {symbol.icon}
                  </div>
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
