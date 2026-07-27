import { useEffect, useId, useState } from 'react'
import type { PuzzleSolution, RingId } from './solution'
import { RING_IDS } from './solution'
import type { SymbolId } from './symbols'
import { SYMBOLS } from './symbols'

type SolutionEditorProps = {
  open: boolean
  solution: PuzzleSolution
  ringOptions: Record<RingId, SymbolId[]>
  onSave: (solution: PuzzleSolution) => void
  onClose: () => void
}

export function SolutionEditor({
  open,
  solution,
  ringOptions,
  onSave,
  onClose,
}: SolutionEditorProps) {
  const titleId = useId()
  const [draft, setDraft] = useState<PuzzleSolution>(solution)

  useEffect(() => {
    if (open) {
      setDraft(solution)
    }
  }, [open, solution])

  useEffect(() => {
    if (!open) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [open, onClose])

  if (!open) return null

  return (
    <div className="solution-editor" role="presentation">
      <button
        type="button"
        className="solution-editor__backdrop"
        aria-label="Close solution editor"
        onClick={onClose}
      />
      <div
        className="solution-editor__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="solution-editor__header">
          <h2 id={titleId}>Edit puzzle solution</h2>
          <p>Choose the four symbols that unlock the dial. Saved in this browser.</p>
        </header>

        <div className="solution-editor__rings">
          {RING_IDS.map((ring) => (
            <fieldset key={ring} className="solution-editor__ring">
              <legend>{ring}</legend>
              <div className="solution-editor__options" role="radiogroup" aria-label={`${ring} ring`}>
                {ringOptions[ring].map((id) => {
                  const symbol = SYMBOLS[id]
                  const selected = draft[ring] === id
                  return (
                    <button
                      key={id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      className={`solution-editor__option${selected ? ' solution-editor__option--selected' : ''}`}
                      onClick={() =>
                        setDraft((current) => ({
                          ...current,
                          [ring]: id,
                        }))
                      }
                    >
                      <span className="solution-editor__option-icon" aria-hidden="true">
                        {symbol.icon}
                      </span>
                      <span className="solution-editor__option-label">{symbol.label}</span>
                    </button>
                  )
                })}
              </div>
            </fieldset>
          ))}
        </div>

        <footer className="solution-editor__actions">
          <button type="button" className="solution-editor__cancel" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="solution-editor__save"
            onClick={() => {
              onSave(draft)
              onClose()
            }}
          >
            Save solution
          </button>
        </footer>
      </div>
    </div>
  )
}
