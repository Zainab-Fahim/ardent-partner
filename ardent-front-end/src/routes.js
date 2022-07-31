import React from 'react'

const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'))
//Products
const ViewProducts = React.lazy(() => import('./views/products/view-products/ViewProducts'))
const AddProducts = React.lazy(() => import('./views/products/add-products/AddProducts'))

const Orders = React.lazy(() => import('./views/orders/Orders'))
const Customers = React.lazy(() => import('./views/customers/Customers'))

const routes = [
  { path: '/', exact: true, name: 'Home' },
  { path: '/dashboard', name: 'Dashboard', element: Dashboard },
  { path: '/customers', name: 'Customers', element: Customers },
  { path: '/orders', name: 'Orders', element: Orders },
  { path: '/products', name: 'Products', element: ViewProducts, exact: true },
  { path: '/products/view-products', name: 'View Products', element: ViewProducts },
  { path: '/products/add-products', name: 'Add Products', element: AddProducts },
]

export default routes
