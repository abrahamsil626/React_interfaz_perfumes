import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Input } from '@/components/ui/Field'
import { GoogleIcon } from '@/components/ui/Icons'
import { Eyebrow, Heading } from '@/components/ui/Type'
import { useAuth } from '@/context/AuthContext'
import { isEmail } from '@/lib/validation'

type Tab = 'signin' | 'register'

export default function LoginPage() {
  const [tab, setTab] = useState<Tab>('signin')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const { signIn, signInWithGoogle } = useAuth()
  const navigate = useNavigate()

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const next: typeof errors = {}
    if (!isEmail(email)) next.email = 'Enter a valid email'
    if (password.length < 6) next.password = 'Minimum 6 characters'
    setErrors(next)
    if (Object.keys(next).length === 0) {
      signIn(email)
      navigate('/account')
    }
  }

  const google = () => {
    signInWithGoogle()
    navigate('/account')
  }

  return (
    <div className="grid min-h-[calc(100vh-56px)] md:grid-cols-2">
      <div className="relative hidden border-r border-hairline md:block">
        <img src="/images/products/obsidian-cuts.jpg" alt="Obsidian flacon" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-x-8 bottom-8 border-t border-hairline-strong pt-4">
          <Eyebrow className="text-ink">Archive lot no. 049 // Obsidia Noir</Eyebrow>
          <p className="mt-2 font-text text-[18px] italic text-body">Volcanic obsidian crystal flacon, chilled extraction of smoked cade wood and mineral birch tar.</p>
        </div>
      </div>

      <div className="flex items-center px-6 py-16 md:px-20">
        <div className="w-full max-w-md">
          <Eyebrow className="mb-4">Connoisseur account</Eyebrow>
          <Heading as="h1" size="lg">Enter the Sanctuary</Heading>
          <p className="mt-4 font-text text-[18px] italic text-body">
            Access exclusive private decants, archival reserve and bespoke courier dispatch.
          </p>

          <div role="tablist" aria-label="Account" className="mt-10 flex gap-8 border-b border-hairline">
            {([['signin', 'Sign in'], ['register', 'Create account']] as const).map(([id, label]) => (
              <button
                key={id}
                role="tab"
                type="button"
                aria-selected={tab === id}
                onClick={() => setTab(id)}
                className={`-mb-px border-0 border-b bg-transparent pb-3 font-mono text-[12px] uppercase tracking-[2px] ${
                  tab === id ? 'border-ink text-ink' : 'border-transparent text-muted'
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          <form onSubmit={onSubmit} noValidate className="mt-8 space-y-6">
            <Input label="Email address" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
            <Input label="Password" type="password" autoComplete={tab === 'signin' ? 'current-password' : 'new-password'} value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
            <Button type="submit" full>{tab === 'signin' ? 'Enter archive' : 'Create account'}</Button>
          </form>

          <div className="my-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[2px] text-muted">
            <span className="h-px flex-1 bg-hairline" /> or <span className="h-px flex-1 bg-hairline" />
          </div>

          <Button full variant="outline" onClick={google}>
            <GoogleIcon size={18} /> Continue with Google
          </Button>
          <p className="mt-6 font-text text-[14px] italic text-muted-soft">
            By entering you accept our terms and privacy policy.
          </p>
        </div>
      </div>
    </div>
  )
}
