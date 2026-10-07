import { useId, type InputHTMLAttributes, type SelectHTMLAttributes } from 'react'

const label = 'font-mono text-[11px] uppercase tracking-[2px] text-muted'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string
  error?: string
}

// AC-DS-5: solo línea inferior; foco → blanca
export function Input({ label: text, error, className = '', id, ...rest }: InputProps) {
  const auto = useId()
  const fieldId = id ?? auto
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={fieldId} className={label}>
        {text}
      </label>
      <input
        id={fieldId}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? `${fieldId}-err` : undefined}
        className="h-11 rounded-none border-0 border-b border-hairline-strong bg-transparent py-3 font-text text-[16px] text-ink outline-none focus:border-ink"
        {...rest}
      />
      {error && (
        <span id={`${fieldId}-err`} role="alert" className="font-mono text-[11px] uppercase tracking-[2px] text-link">
          {error}
        </span>
      )}
    </div>
  )
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string
}

export function Select({ label: text, className = '', id, children, ...rest }: SelectProps) {
  const auto = useId()
  const fieldId = id ?? auto
  return (
    <div className={`flex flex-col gap-1 ${className}`}>
      <label htmlFor={fieldId} className={label}>
        {text}
      </label>
      <select
        id={fieldId}
        className="h-11 rounded-none border-0 border-b border-hairline-strong bg-canvas font-mono text-[13px] uppercase tracking-[2px] text-ink outline-none focus:border-ink"
        {...rest}
      >
        {children}
      </select>
    </div>
  )
}

interface CheckProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
  kind?: 'checkbox' | 'radio'
  hint?: string
}

// Cuadrado 14px para checkbox, círculo para radio (spec 01)
export function Check({ label: text, kind = 'checkbox', hint, className = '', ...rest }: CheckProps) {
  return (
    <label className={`flex cursor-pointer items-center gap-3 font-mono text-[12px] uppercase tracking-[2px] text-body ${className}`}>
      <input
        type={kind}
        className={`size-[14px] shrink-0 appearance-none border border-hairline-strong bg-transparent checked:border-ink checked:bg-ink ${kind === 'radio' ? 'rounded-full checked:border-[3px] checked:border-canvas checked:outline checked:outline-1 checked:outline-ink' : 'rounded-none'}`}
        {...rest}
      />
      <span className="flex-1">{text}</span>
      {hint && <span className="text-muted">{hint}</span>}
    </label>
  )
}
