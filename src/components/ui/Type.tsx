import type { ReactNode } from 'react'

export function Eyebrow({ children, className = '' }: { children: ReactNode; className?: string }) {
  return (
    <p className={`font-mono text-[11px] uppercase tracking-[2px] text-muted ${className}`}>{children}</p>
  )
}

type Size = 'xl' | 'lg' | 'md' | 'sm'
const sizes: Record<Size, string> = {
  xl: 'text-[38px] tracking-[4px] leading-[1.1] md:text-[64px] md:tracking-[6px]',
  lg: 'text-[28px] tracking-[3px] leading-[1.15] md:text-[48px] md:tracking-[4px]',
  md: 'text-[24px] tracking-[2px] leading-[1.2] md:text-[32px]',
  sm: 'text-[20px] tracking-[1.5px] leading-[1.3] md:text-[24px]',
}

export function Heading({
  as: Tag = 'h2',
  size = 'lg',
  children,
  className = '',
}: {
  as?: 'h1' | 'h2' | 'h3' | 'h4'
  size?: Size
  children: ReactNode
  className?: string
}) {
  return <Tag className={`${sizes[size]} ${className}`}>{children}</Tag>
}

export function Rule({ className = '' }: { className?: string }) {
  return <hr className={`m-0 border-0 border-t border-hairline ${className}`} />
}

export function Section({
  children,
  className = '',
  id,
  label,
}: {
  children: ReactNode
  className?: string
  id?: string
  label?: string
}) {
  return (
    <section id={id} aria-label={label} className={`px-6 py-16 md:px-20 md:py-[120px] ${className}`}>
      <div className="mx-auto w-full max-w-page">{children}</div>
    </section>
  )
}

export function Chip({
  children,
  active,
  onClick,
  className = '',
}: {
  children: ReactNode
  active?: boolean
  onClick?: () => void
  className?: string
}) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`inline-flex h-8 items-center gap-2 rounded-none border bg-transparent px-3 font-mono text-[11px] uppercase tracking-[2px] ${
        active ? 'border-ink text-ink' : 'border-hairline text-muted hover:border-hairline-strong hover:text-ink'
      } ${className}`}
    >
      {active && <span className="size-1.5 rounded-full bg-link" />}
      {children}
    </button>
  )
}

export function Stars({ value }: { value: number }) {
  return (
    <span role="img" aria-label={`${value} out of 5 stars`} className="font-mono text-[14px] tracking-[3px] text-ink">
      {'★'.repeat(value)}
      <span className="text-muted-soft">{'★'.repeat(5 - value)}</span>
    </span>
  )
}
