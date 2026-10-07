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
    if (!isEmail(email)) next.email = 'Introduce un correo válido'
    if (password.length < 6) next.password = 'Mínimo 6 caracteres'
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
        <img src="/images/products/obsidian-cuts.jpg" alt="Frasco de obsidiana" className="absolute inset-0 size-full object-cover" />
        <div className="absolute inset-x-8 bottom-8 border-t border-hairline-strong pt-4">
          <Eyebrow className="text-ink">Lote de archivo n.º 049 {'//'} Obsidia Noir</Eyebrow>
          <p className="mt-2 font-text text-[18px] italic text-body">Frasco de cristal de obsidiana volcánica, extracción enfriada de madera de cade ahumada y alquitrán mineral de abedul.</p>
        </div>
      </div>

      <div className="flex items-center px-6 py-16 md:px-20">
        <div className="w-full max-w-md">
          <Eyebrow className="mb-4">Cuenta de conocedor</Eyebrow>
          <Heading as="h1" size="lg">Entra al santuario</Heading>
          <p className="mt-4 font-text text-[18px] italic text-body">
            Accede a decants privados exclusivos, reservas del archivo y envío a medida por mensajería diplomática.
          </p>

          <div role="tablist" aria-label="Cuenta" className="mt-10 flex gap-8 border-b border-hairline">
            {([['signin', 'Iniciar sesión'], ['register', 'Crear cuenta']] as const).map(([id, label]) => (
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
            <Input label="Correo electrónico" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} error={errors.email} />
            <Input label="Contraseña" type="password" autoComplete={tab === 'signin' ? 'current-password' : 'new-password'} value={password} onChange={(e) => setPassword(e.target.value)} error={errors.password} />
            <Button type="submit" full>{tab === 'signin' ? 'Entrar al archivo' : 'Crear cuenta'}</Button>
          </form>

          <div className="my-6 flex items-center gap-4 font-mono text-[11px] uppercase tracking-[2px] text-muted">
            <span className="h-px flex-1 bg-hairline" /> o <span className="h-px flex-1 bg-hairline" />
          </div>

          <Button full variant="outline" onClick={google}>
            <GoogleIcon size={18} /> Continuar con Google
          </Button>
          <p className="mt-6 font-text text-[14px] italic text-muted-soft">
            Al entrar aceptas nuestros términos y la política de privacidad.
          </p>
        </div>
      </div>
    </div>
  )
}
