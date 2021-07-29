import { lazy } from 'react'

const DashboardRoutes = [
  // Dashboards
  {
    path: '/dashboard/analytics',
    component: lazy(() => import('../../views/dashboard/analytics'))
  },
  {
    path: '/dashboard/ecommerce',
    component: lazy(() => import('../../views/dashboard/ecommerce'))
  },
  {
    path: '/dashboard/homepage1',
    component: lazy(() => import('../../views/dashboard/homepage1')),
    exact: true
  }
]

export default DashboardRoutes
