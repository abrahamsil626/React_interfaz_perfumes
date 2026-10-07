import { StrictMode } from 'react'
import { render } from '@testing-library/react'
import { createMemoryRouter, RouterProvider } from 'react-router-dom'
import { Providers } from '@/Providers'
import { routes } from '@/routes'

/** Mismo árbol que src/main.tsx (incluye StrictMode, que re-ejecuta efectos en desarrollo). */
export function renderApp(path = '/') {
  const router = createMemoryRouter(routes, { initialEntries: [path] })
  const utils = render(
    <StrictMode>
      <Providers>
        <RouterProvider router={router} />
      </Providers>
    </StrictMode>,
  )
  return { router, ...utils }
}
