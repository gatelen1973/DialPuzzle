import { useCallback, useMemo, useState } from 'react'
import { DialRing } from './DialRing'
import type { SymbolId } from './symbols'
import { SYMBOLS } from './symbols'

const OUTER_SYMBOLS: SymbolId[] = [
  'containment',
  'star',
  'judgment',
  'moon',
  'diamond',
  'sun',
  'spiral',
  'triangle',
]

const MIDDLE_SYMBOLS: SymbolId[] = [
  'memory',
  'circle',
  'endurance',
  'cross',
  'star',
  'moon',
  'diamond',
  'spiral',
]

const INNER_SYMBOLS: SymbolId[] = [
  'sun',
  'triangle',
  'circle',
  'cross',
  'star',
  'moon',
]

type RingState = {
  index: number
  symbols: SymbolId[]
}

function getActiveSymbol(ring: RingState): SymbolId {
  const count = ring.symbols.length
  const normalized = ((ring.index % count) + count) % count
  return ring.symbols[normalized]
}

export function DialPuzzle() {
  const [outerIndex, setOuterIndex] = useState(0)
  const [middleIndex, setMiddleIndex] = useState(2)
  const [innerIndex, setInnerIndex] = useState(1)

  const outerStep = 360 / OUTER_SYMBOLS.length
  const middleStep = 360 / MIDDLE_SYMBOLS.length
  const innerStep = 360 / INNER_SYMBOLS.length

  const rotateOuter = useCallback(() => setOuterIndex((i) => i + 1), [])
  const rotateMiddle = useCallback(() => setMiddleIndex((i) => i + 1), [])
  const rotateInner = useCallback(() => setInnerIndex((i) => i + 1), [])

  const activeSymbols = useMemo(
    () => ({
      outer: getActiveSymbol({ index: outerIndex, symbols: OUTER_SYMBOLS }),
      middle: getActiveSymbol({ index: middleIndex, symbols: MIDDLE_SYMBOLS }),
      inner: getActiveSymbol({ index: innerIndex, symbols: INNER_SYMBOLS }),
    }),
    [outerIndex, middleIndex, innerIndex],
  )

  return (
    <div className="dial-puzzle">
      <header className="dial-puzzle__header">
        <h1>Dial Puzzle</h1>
        <p>Click each ring to rotate it independently. Align the symbols at the marker.</p>
      </header>

      <div className="dial-puzzle__stage">
        <div className="dial-puzzle__marker" aria-hidden="true" />

        <div className="dial-puzzle__rings">
          <DialRing
            label="outer"
            symbolIds={OUTER_SYMBOLS}
            rotation={-outerIndex * outerStep}
            size={420}
            thickness={52}
            onRotate={rotateOuter}
            zIndex={1}
          />
          <DialRing
            label="middle"
            symbolIds={MIDDLE_SYMBOLS}
            rotation={-middleIndex * middleStep}
            size={300}
            thickness={48}
            onRotate={rotateMiddle}
            zIndex={2}
          />
          <DialRing
            label="inner"
            symbolIds={INNER_SYMBOLS}
            rotation={-innerIndex * innerStep}
            size={180}
            thickness={44}
            onRotate={rotateInner}
            zIndex={3}
          />
        </div>

        <div className="dial-puzzle__hub" aria-hidden="true">
          <div className="dial-puzzle__hub-inner" />
        </div>
      </div>

      <aside className="dial-puzzle__readout">
        <h2>Active symbols</h2>
        <ul>
          {(['outer', 'middle', 'inner'] as const).map((ring) => {
            const id = activeSymbols[ring]
            const symbol = SYMBOLS[id]
            return (
              <li key={ring}>
                <span className="readout__ring">{ring}</span>
                <span className="readout__icon">{symbol.icon}</span>
                <span className="readout__label">{symbol.label}</span>
              </li>
            )
          })}
        </ul>
        <p className="dial-puzzle__legend">
          Key symbols: Containment, Judgment, Memory, and Endurance appear across the rings.
        </p>
      </aside>
    </div>
  )
}
