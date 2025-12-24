import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import { createBrowserRouter } from "react-router";
import { RouterProvider } from "react-router/dom";
import RootLayout from './layouts/RootLayout.jsx';
import Home from './components/Home/Home.jsx';
import AllProducts from './components/AllProducts/AllProducts.jsx';
import AuthProvider from './contexts/AuthProvider.jsx';
import Register from './components/Register/Register.jsx';
import MyListings from './components/MyListings/MyListings.jsx';
import MyOrders from './components/MyOrders/MyOrders.jsx';
import ProductDetails from './components/ProductDetails/ProductDetails.jsx';
import PrivateRoute from './Routes/PrivateRoute.jsx';
import AddListing from './components/AddListing/AddListing.jsx';
import UpdateProduct from './components/UpdateProduct/UpdateProduct.jsx';
import Login from './components/Login/Login.jsx';

const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home
      },
      {
        path: 'allProducts',
        element: <AllProducts></AllProducts>,
        loader: () => fetch('http://localhost:3000/products')
      },
      {
        path: 'register',
        Component: Register
      },
      {
        path: 'login',
        Component: Login
      },
      {
        path: 'myListings',
        element: <PrivateRoute><MyListings></MyListings></PrivateRoute>
      },
      {
        path: 'myOrders',
        element: <PrivateRoute><MyOrders></MyOrders></PrivateRoute>
      },
      {
        path: 'productDetails/:id',
        loader: ({params}) => fetch(`http://localhost:3000/products/${params.id}`),
        element: <PrivateRoute><ProductDetails></ProductDetails></PrivateRoute>
      },
      {
        path: 'updateProduct/:id',
        loader: ({params}) => fetch(`http://localhost:3000/products/${params.id}`),
        element: <PrivateRoute><UpdateProduct></UpdateProduct></PrivateRoute>
      },
      {
        path: 'addListing',
        element: <PrivateRoute><AddListing></AddListing></PrivateRoute>
      }
    ]
  },
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />,
    </AuthProvider>
  </StrictMode>,
)
