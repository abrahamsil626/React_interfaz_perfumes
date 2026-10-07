import type { RouteObject } from 'react-router-dom'
import { FocusLayout, Layout } from '@/components/layout/Layout'
import AboutPage from '@/pages/AboutPage'
import AccountPage from '@/pages/AccountPage'
import BagPage from '@/pages/BagPage'
import CatalogPage from '@/pages/CatalogPage'
import CheckoutPage from '@/pages/CheckoutPage'
import CollectionsPage from '@/pages/CollectionsPage'
import ConfirmationPage from '@/pages/ConfirmationPage'
import ContactPage from '@/pages/ContactPage'
import FaqPage from '@/pages/FaqPage'
import FavoritesPage from '@/pages/FavoritesPage'
import HomePage from '@/pages/HomePage'
import LegalPage from '@/pages/LegalPage'
import LoginPage from '@/pages/LoginPage'
import NotFoundPage from '@/pages/NotFoundPage'
import ProductPage from '@/pages/ProductPage'
import PromotionsPage from '@/pages/PromotionsPage'
import ReviewsPage from '@/pages/ReviewsPage'
import ScentFinderPage from '@/pages/ScentFinderPage'
import TrackOrderPage from '@/pages/TrackOrderPage'

/** Spec 02: mapa de rutas. Única fuente de verdad. */
export const routes: RouteObject[] = [
  {
    element: <Layout />,
    children: [
      { path: '/', element: <HomePage /> },
      { path: '/collection', element: <CatalogPage /> },
      { path: '/product/:slug', element: <ProductPage /> },
      { path: '/scent-finder', element: <ScentFinderPage /> },
      { path: '/collections', element: <CollectionsPage /> },
      { path: '/promotions', element: <PromotionsPage /> },
      { path: '/reviews', element: <ReviewsPage /> },
      { path: '/bag', element: <BagPage /> },
      { path: '/order-confirmation', element: <ConfirmationPage /> },
      { path: '/account', element: <AccountPage /> },
      { path: '/favorites', element: <FavoritesPage /> },
      { path: '/track-order', element: <TrackOrderPage /> },
      { path: '/contact', element: <ContactPage /> },
      { path: '/faq', element: <FaqPage /> },
      { path: '/about', element: <AboutPage /> },
      { path: '/legal/:doc', element: <LegalPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
  {
    element: <FocusLayout backTo="/bag" backLabel="Return to bag" />,
    children: [{ path: '/checkout', element: <CheckoutPage /> }],
  },
  {
    element: <FocusLayout backTo="/" backLabel="Return to archive" />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
]

/** Rutas estáticas para pruebas de enlaces (AC-NAV-7). */
export const staticPaths = [
  '/', '/collection', '/product/obsidia-noir', '/scent-finder', '/collections', '/promotions',
  '/reviews', '/bag', '/checkout', '/order-confirmation', '/login', '/account', '/favorites',
  '/track-order', '/contact', '/faq', '/about', '/legal/terms', '/legal/privacy', '/legal/returns',
]
