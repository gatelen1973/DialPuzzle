import type { SymbolId } from './symbols'

export type RingId = 'outer' | 'middle' | 'inner' | 'core'

export type PuzzleSolution = Record<RingId, SymbolId>

export const RING_IDS: RingId[] = ['outer', 'middle', 'inner', 'core']

export const DEFAULT_SOLUTION: PuzzleSolution = {
  outer: 'containment',
  middle: 'eye',
  inner: 'star',
  core: 'rune',
}

const STORAGE_KEY = 'dialpuzzle.solution'

function isSymbolId(value: unknown, allowed: SymbolId[]): value is SymbolId {
  return typeof value === 'string' && allowed.includes(value as SymbolId)
}

export function loadSolution(
  ringOptions: Record<RingId, SymbolId[]>,
): PuzzleSolution {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return { ...DEFAULT_SOLUTION }

    const parsed = JSON.parse(raw) as Partial<Record<RingId, unknown>>
    const solution = { ...DEFAULT_SOLUTION }

    for (const ring of RING_IDS) {
      if (isSymbolId(parsed[ring], ringOptions[ring])) {
        solution[ring] = parsed[ring]
      }
    }

    return solution
  } catch {
    return { ...DEFAULT_SOLUTION }
  }
}

export function saveSolution(solution: PuzzleSolution): void {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(solution))
}
