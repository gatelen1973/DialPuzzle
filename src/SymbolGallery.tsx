import { useEffect, useId, useState } from 'react'
import type { SymbolId } from './symbols'
import { SYMBOLS } from './symbols'

const ALL_SYMBOLS = Object.values(SYMBOLS)

type SymbolPreviewProps = {
  symbolId: SymbolId | null
  onClose: () => void
}

function SymbolPreview({ symbolId, onClose }: SymbolPreviewProps) {
  const titleId = useId()

  useEffect(() => {
    if (!symbolId) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        onClose()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [symbolId, onClose])

  if (!symbolId) return null

  const symbol = SYMBOLS[symbolId]

  return (
    <div className="symbol-preview" role="presentation">
      <button
        type="button"
        className="symbol-preview__backdrop"
        aria-label="Close symbol preview"
        onClick={onClose}
      />
      <div
        className="symbol-preview__dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
      >
        <header className="symbol-preview__header">
          <h2 id={titleId}>{symbol.label}</h2>
          <button
            type="button"
            className="symbol-preview__close"
            aria-label="Close"
            onClick={onClose}
          >
            ×
          </button>
        </header>
        <div className="symbol-preview__icon" aria-hidden="true">
          {symbol.icon}
        </div>
      </div>
    </div>
  )
}

export function SymbolGallery() {
  const [selectedId, setSelectedId] = useState<SymbolId | null>(null)

  return (
    <div className="symbol-gallery">
      <header className="symbol-gallery__header">
        <p className="symbol-gallery__eyebrow">Reference</p>
        <h1>Symbols</h1>
        <p>Click a symbol to view a larger version.</p>
      </header>

      <ul className="symbol-gallery__grid">
        {ALL_SYMBOLS.map((symbol) => (
          <li key={symbol.id}>
            <button
              type="button"
              className="symbol-gallery__card"
              onClick={() => setSelectedId(symbol.id)}
            >
              <span className="symbol-gallery__card-icon" aria-hidden="true">
                {symbol.icon}
              </span>
              <span className="symbol-gallery__card-label">{symbol.label}</span>
            </button>
          </li>
        ))}
      </ul>

      <SymbolPreview symbolId={selectedId} onClose={() => setSelectedId(null)} />
    </div>
  )
}
