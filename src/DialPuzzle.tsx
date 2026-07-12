import { useCallback, useMemo, useState } from 'react'
import { DialRing } from './DialRing'
import { DungeonDoors } from './DungeonDoors'
import { playHubFailSound, playPuzzleSolvedSound, playRotateSound } from './sounds'
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
  'eye',
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

const CORE_SYMBOLS: SymbolId[] = [
  'rune',
  'judgment',
  'memory',
  'endurance',
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

const OUTER_SIZE = 580

const PUZZLE_SOLUTION = {
  outer: 'containment',
  middle: 'eye',
  inner: 'star',
  core: 'rune',
} as const satisfies Record<'outer' | 'middle' | 'inner' | 'core', SymbolId>

export function DialPuzzle() {
  const [outerIndex, setOuterIndex] = useState(0)
  const [middleIndex, setMiddleIndex] = useState(2)
  const [innerIndex, setInnerIndex] = useState(1)
  const [coreIndex, setCoreIndex] = useState(3)
  const [showDoors, setShowDoors] = useState(false)
  const [hubShake, setHubShake] = useState(false)

  const outerStep = 360 / OUTER_SYMBOLS.length
  const middleStep = 360 / MIDDLE_SYMBOLS.length
  const innerStep = 360 / INNER_SYMBOLS.length
  const coreStep = 360 / CORE_SYMBOLS.length

  const rotateOuter = useCallback(() => {
    playRotateSound()
    setOuterIndex((i) => i + 1)
  }, [])
  const rotateMiddle = useCallback(() => {
    playRotateSound()
    setMiddleIndex((i) => i + 1)
  }, [])
  const rotateInner = useCallback(() => {
    playRotateSound()
    setInnerIndex((i) => i + 1)
  }, [])
  const rotateCore = useCallback(() => {
    playRotateSound()
    setCoreIndex((i) => i + 1)
  }, [])

  const activeSymbols = useMemo(
    () => ({
      outer: getActiveSymbol({ index: outerIndex, symbols: OUTER_SYMBOLS }),
      middle: getActiveSymbol({ index: middleIndex, symbols: MIDDLE_SYMBOLS }),
      inner: getActiveSymbol({ index: innerIndex, symbols: INNER_SYMBOLS }),
      core: getActiveSymbol({ index: coreIndex, symbols: CORE_SYMBOLS }),
    }),
    [outerIndex, middleIndex, innerIndex, coreIndex],
  )

  const isSolved = useMemo(
    () =>
      activeSymbols.outer === PUZZLE_SOLUTION.outer &&
      activeSymbols.middle === PUZZLE_SOLUTION.middle &&
      activeSymbols.inner === PUZZLE_SOLUTION.inner &&
      activeSymbols.core === PUZZLE_SOLUTION.core,
    [activeSymbols],
  )

  const handleHubClick = useCallback(() => {
    if (isSolved) {
      playPuzzleSolvedSound()
      setShowDoors(true)
      return
    }

    playHubFailSound()
    setHubShake(true)
    window.setTimeout(() => setHubShake(false), 450)
  }, [isSolved])

  return (
    <div className="dial-puzzle">
      <header className="dial-puzzle__header">
        <h1>Dial Puzzle</h1>
        <p>Click each ring to rotate it independently.</p>
      </header>

      <div className="dial-puzzle__main">
        <div className="dial-puzzle__dial">
          <div className="dial-puzzle__marker" aria-hidden="true">
            <svg viewBox="0 0 16 10" width="16" height="10">
              <path
                d="M2 2 L8 8 L14 2"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </div>

          <div
            className="dial-puzzle__stage"
            style={{ width: OUTER_SIZE, height: OUTER_SIZE }}
          >
          <div
            className="dial-puzzle__rings"
            style={{ width: OUTER_SIZE, height: OUTER_SIZE }}
          >
            <DialRing
              label="outer"
              symbolIds={OUTER_SYMBOLS}
              rotation={-outerIndex * outerStep}
              size={OUTER_SIZE}
              thickness={72}
              onRotate={rotateOuter}
              zIndex={1}
            />
            <DialRing
              label="middle"
              symbolIds={MIDDLE_SYMBOLS}
              rotation={-middleIndex * middleStep}
              size={415}
              thickness={67}
              onRotate={rotateMiddle}
              zIndex={2}
            />
            <DialRing
              label="inner"
              symbolIds={INNER_SYMBOLS}
              rotation={-innerIndex * innerStep}
              size={248}
              thickness={61}
              onRotate={rotateInner}
              zIndex={3}
            />
            <DialRing
              label="core"
              symbolIds={CORE_SYMBOLS}
              rotation={-coreIndex * coreStep}
              size={110}
              thickness={35}
              onRotate={rotateCore}
              zIndex={4}
            />
          </div>

          <button
            type="button"
            className={`dial-puzzle__hub${isSolved ? ' dial-puzzle__hub--ready' : ''}${hubShake ? ' dial-puzzle__hub--shake' : ''}`}
            aria-label={
              isSolved
                ? 'Activate the dial mechanism. All symbols are aligned.'
                : 'Activate the dial mechanism'
            }
            onClick={handleHubClick}
          >
            <span className="dial-puzzle__hub-inner" aria-hidden="true" />
          </button>
        </div>
        </div>

        <aside className="dial-puzzle__readout">
          <h2>Active symbols</h2>
          <ul>
            {(['outer', 'middle', 'inner', 'core'] as const).map((ring) => {
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

      {showDoors ? <DungeonDoors onClose={() => setShowDoors(false)} /> : null}
    </div>
  )
}
