import { useEffect, useState } from 'react'
import { DialPuzzle } from './DialPuzzle'
import { SymbolGallery } from './SymbolGallery'
import './App.css'

type Page = 'puzzle' | 'symbols'

function getPageFromHash(): Page {
  return window.location.hash === '#symbols' ? 'symbols' : 'puzzle'
}

export default function App() {
  const [page, setPage] = useState<Page>(getPageFromHash)

  useEffect(() => {
    const handleHashChange = () => setPage(getPageFromHash())
    window.addEventListener('hashchange', handleHashChange)
    return () => window.removeEventListener('hashchange', handleHashChange)
  }, [])

  return (
    <>
      <nav className="app-nav" aria-label="Primary">
        <a
          href="#puzzle"
          className={`app-nav__link${page === 'puzzle' ? ' app-nav__link--active' : ''}`}
          aria-current={page === 'puzzle' ? 'page' : undefined}
          onClick={(event) => {
            event.preventDefault()
            window.location.hash = 'puzzle'
          }}
        >
          Puzzle
        </a>
        <a
          href="#symbols"
          className={`app-nav__link${page === 'symbols' ? ' app-nav__link--active' : ''}`}
          aria-current={page === 'symbols' ? 'page' : undefined}
          onClick={(event) => {
            event.preventDefault()
            window.location.hash = 'symbols'
          }}
        >
          Symbols
        </a>
      </nav>

      {page === 'symbols' ? <SymbolGallery /> : <DialPuzzle />}
    </>
  )
}
