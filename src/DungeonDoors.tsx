import { useEffect, useState } from 'react'
import { playDoorsOpenSound } from './sounds'

type DungeonDoorsProps = {
  onClose: () => void
}

export function DungeonDoors({ onClose }: DungeonDoorsProps) {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const frame = requestAnimationFrame(() => setOpen(true))
    const doorSoundTimer = window.setTimeout(() => playDoorsOpenSound(), 480)
    return () => {
      cancelAnimationFrame(frame)
      window.clearTimeout(doorSoundTimer)
    }
  }, [])

  return (
    <div
      className={`dungeon-doors${open ? ' dungeon-doors--open' : ''}`}
      role="dialog"
      aria-modal="true"
      aria-labelledby="dungeon-doors-title"
    >
      <div className="dungeon-doors__backdrop" onClick={onClose} aria-hidden="true" />

      <div className="dungeon-doors__passage">
        <div className="dungeon-doors__glow" aria-hidden="true" />
        <p className="dungeon-doors__eyebrow">The mechanism aligns</p>
        <h2 id="dungeon-doors-title" className="dungeon-doors__title">
          The doors open
        </h2>
        <button type="button" className="dungeon-doors__close" onClick={onClose}>
          Return to the dial
        </button>
      </div>

      <div className="dungeon-doors__door dungeon-doors__door--left" aria-hidden="true">
        <div className="dungeon-doors__arch" />
        <div className="dungeon-doors__band dungeon-doors__band--top" />
        <div className="dungeon-doors__band dungeon-doors__band--middle" />
        <div className="dungeon-doors__band dungeon-doors__band--bottom" />
        <div className="dungeon-doors__rivets" />
      </div>

      <div className="dungeon-doors__door dungeon-doors__door--right" aria-hidden="true">
        <div className="dungeon-doors__arch" />
        <div className="dungeon-doors__band dungeon-doors__band--top" />
        <div className="dungeon-doors__band dungeon-doors__band--middle" />
        <div className="dungeon-doors__band dungeon-doors__band--bottom" />
        <div className="dungeon-doors__rivets" />
      </div>
    </div>
  )
}
