import { useState } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/Button'
import { Eyebrow, Heading, Rule, Section } from '@/components/ui/Type'
import { useAuth } from '@/context/AuthContext'
import { useCart } from '@/context/CartContext'
import { useFavorites } from '@/context/FavoritesContext'
import { getProduct, money } from '@/data/products'

type Panel = 'orders' | 'addresses' | 'payments' | 'favorites' | 'loyalty' | 'settings'

const panels: { id: Panel; label: string }[] = [
  { id: 'orders', label: 'Pedidos' },
  { id: 'addresses', label: 'Direcciones' },
  { id: 'payments', label: 'Métodos de pago' },
  { id: 'favorites', label: 'Favoritos' },
  { id: 'loyalty', label: 'Fidelidad' },
  { id: 'settings', label: 'Ajustes' },
]

const history = [
  { no: 'MP-4410822', date: '12 sep 2026', status: 'Entregado', total: 980 },
  { no: 'MP-3987154', date: '03 jun 2026', status: 'Entregado', total: 520 },
]

export default function AccountPage() {
  const { user, signOut } = useAuth()
  const { order } = useCart()
  const { slugs } = useFavorites()
  const navigate = useNavigate()
  const [panel, setPanel] = useState<Panel>('orders')
  const [leaving, setLeaving] = useState(false)

  // AC-AUTH-2 (no redirigir a /login cuando el usuario cierra sesión a propósito: AC-ACC-3)
  if (!user) return leaving ? null : <Navigate to="/login" replace />

  const rows = [
    ...(order ? [{ no: order.number, date: new Date(order.placedAt).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' }), status: 'En tránsito', total: order.total }] : []),
    ...history,
  ]

  return (
    <Section label="Cuenta">
      <Eyebrow className="mb-4">Cuenta de conocedor</Eyebrow>
      <Heading as="h1" size="xl">Mi cuenta</Heading>
      <p className="mt-4 font-text text-[20px] italic text-body">Te damos la bienvenida de nuevo, {user.name}.</p>
      <Rule className="my-10" />

      <div className="grid gap-12 lg:grid-cols-[240px_1fr]">
        <nav aria-label="Secciones de la cuenta" className="flex flex-row flex-wrap gap-x-6 gap-y-3 lg:flex-col lg:gap-0">
          {panels.map((p) => (
            <button
              key={p.id}
              type="button"
              aria-current={panel === p.id ? 'page' : undefined}
              onClick={() => setPanel(p.id)}
              className={`border-0 bg-transparent py-3 text-left font-mono text-[12px] uppercase tracking-[2px] lg:border-b lg:border-hairline ${
                panel === p.id ? 'text-ink' : 'text-muted hover:text-ink'
              }`}
            >
              {p.label}
            </button>
          ))}
          <button
            type="button"
            onClick={() => {
              setLeaving(true)
              signOut()
              navigate('/')
            }}
            className="border-0 bg-transparent py-3 text-left font-mono text-[12px] uppercase tracking-[2px] text-muted hover:text-ink"
          >
            Cerrar sesión
          </button>
        </nav>

        <div aria-live="polite">
          {panel === 'orders' && (
            <section aria-label="Pedidos">
              <h2 className="mb-6 text-[26px] tracking-[3px]">Pedidos recientes</h2>
              <table className="w-full border-collapse text-left font-mono text-[12px] uppercase tracking-[2px]">
                <thead>
                  <tr className="border-b border-hairline text-muted">
                    <th className="py-3 font-normal">Pedido</th><th className="py-3 font-normal">Fecha</th>
                    <th className="py-3 font-normal">Estado</th><th className="py-3 text-right font-normal">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {rows.map((r) => (
                    <tr key={r.no} className="border-b border-hairline text-ink">
                      <td className="py-4">{r.no}</td><td>{r.date}</td><td>{r.status}</td>
                      <td className="text-right">{money(r.total)} <Link to="/track-order" className="ml-3 text-link underline underline-offset-4">Ver</Link></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </section>
          )}

          {panel === 'addresses' && (
            <section aria-label="Direcciones">
              <h2 className="mb-6 text-[26px] tracking-[3px]">Direcciones guardadas</h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {[['Casa', '24 Place Vendôme, 75001 París, Francia'], ['Atelier', '12 Rue de la Paix, 75002 París, Francia']].map(([k, v]) => (
                  <div key={k} className="border border-hairline bg-surface-card p-6">
                    <Eyebrow>{k}</Eyebrow>
                    <p className="mt-2 font-text text-[18px] text-body">{user.name}<br />{v}</p>
                  </div>
                ))}
              </div>
            </section>
          )}

          {panel === 'payments' && (
            <section aria-label="Métodos de pago">
              <h2 className="mb-6 text-[26px] tracking-[3px]">Métodos de pago</h2>
              <ul className="m-0 list-none p-0">
                {[['Visa •••• 8892', 'Predeterminada'], ['Mastercard •••• 4410', '']].map(([k, v]) => (
                  <li key={k} className="flex justify-between border-b border-hairline py-4 font-mono text-[12px] uppercase tracking-[2px] text-ink">
                    {k}<span className="text-muted">{v}</span>
                  </li>
                ))}
              </ul>
              <Button className="mt-8">Añadir nuevo</Button>
            </section>
          )}

          {panel === 'favorites' && (
            <section aria-label="Favoritos">
              <h2 className="mb-6 text-[26px] tracking-[3px]">Favoritos ({slugs.length})</h2>
              <ul className="m-0 list-none space-y-2 p-0 font-text text-[18px] text-body">
                {slugs.map((s) => <li key={s}>{getProduct(s)?.name}</li>)}
              </ul>
              <Link to="/favorites" className="mt-6 inline-block font-mono text-[12px] uppercase tracking-[2px] text-link underline underline-offset-8">Abrir favoritos</Link>
            </section>
          )}

          {panel === 'loyalty' && (
            <section aria-label="Fidelidad">
              <h2 className="mb-6 text-[26px] tracking-[3px]">Fidelidad</h2>
              <p className="font-text text-[18px] text-body">Tienes <span className="text-ink">1.480</span> puntos. Canjéalos en asignaciones privadas.</p>
            </section>
          )}

          {panel === 'settings' && (
            <section aria-label="Ajustes">
              <h2 className="mb-6 text-[26px] tracking-[3px]">Ajustes</h2>
              <dl className="m-0 space-y-3 font-mono text-[12px] uppercase tracking-[2px]">
                <div><dt className="text-muted">Nombre</dt><dd className="m-0 text-ink">{user.name}</dd></div>
                <div><dt className="text-muted">Correo electrónico</dt><dd className="m-0 text-ink">{user.email}</dd></div>
                <div><dt className="text-muted">Método de acceso</dt><dd className="m-0 text-ink">{user.provider === 'google' ? 'Google' : 'Correo electrónico'}</dd></div>
              </dl>
            </section>
          )}
        </div>
      </div>
    </Section>
  )
}
