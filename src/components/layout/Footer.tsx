import { Link } from 'react-router-dom'
import { footerColumns } from './nav'

export function Footer() {
  return (
    <footer className="border-t border-hairline bg-canvas px-6 py-16 md:px-20">
      <div className="mx-auto max-w-page">
        <div className="grid gap-12 md:grid-cols-[1.4fr_repeat(4,1fr)]">
          <div>
            <p className="font-display text-[14px] uppercase tracking-[6px] text-ink">Menti Parfum</p>
            <p className="mt-4 max-w-xs font-text text-[16px] text-body">
              Monolithic structures conceived for olfactive eternity. Rare resinous extracts and hand-blown obsidian glass.
            </p>
          </div>
          {footerColumns.map((col) => (
            <nav key={col.title} aria-label={col.title}>
              <p className="mb-5 font-mono text-[11px] uppercase tracking-[2px] text-muted-soft">{col.title}</p>
              <ul className="m-0 flex list-none flex-col gap-3 p-0">
                {col.links.map((l) => (
                  <li key={l.label}>
                    <Link to={l.to} className="font-mono text-[11px] uppercase tracking-[2px] text-muted hover:text-ink">
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>
        <div className="mt-16 flex flex-col gap-4 border-t border-hairline pt-8 md:flex-row md:justify-between">
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-muted-soft">
            © 2026 Menti Parfum. All rights reserved.
          </p>
          <p className="font-mono text-[11px] uppercase tracking-[2px] text-muted-soft">Grasse / Paris / Kyoto</p>
        </div>
        <p className="mt-10 text-center font-display text-[14px] uppercase tracking-[6px] text-muted">Menti Parfum</p>
      </div>
    </footer>
  )
}
