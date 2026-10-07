import { Link } from 'react-router-dom'
import type { ButtonHTMLAttributes, ReactNode } from 'react'

type Variant = 'outline' | 'text' | 'icon'

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
  to?: string
  full?: boolean
  children: ReactNode
}

// AC-DS-3/4: píldora transparente con borde blanco 1px; mono, mayúsculas, tracking 2.5px
const styles: Record<Variant, string> = {
  outline:
    'inline-flex h-11 items-center justify-center gap-3 rounded-full border border-ink bg-transparent px-8 font-mono text-[14px] uppercase tracking-[2.5px] text-ink transition-colors hover:bg-white/10 active:bg-white/20 disabled:cursor-not-allowed disabled:border-hairline-strong disabled:text-muted-soft disabled:hover:bg-transparent',
  text:
    'inline-flex items-center gap-2 border-0 bg-transparent p-0 font-mono text-[12px] uppercase tracking-[2px] text-ink underline-offset-8 hover:underline',
  icon:
    'inline-flex size-10 items-center justify-center rounded-full border border-ink bg-transparent text-ink transition-colors hover:bg-white/10',
}

export function Button({ variant = 'outline', to, full, className = '', children, ...rest }: Props) {
  const cls = `${styles[variant]} ${full ? 'w-full' : ''} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls}>
        {children}
      </Link>
    )
  }
  return (
    <button type="button" className={cls} {...rest}>
      {children}
    </button>
  )
}
