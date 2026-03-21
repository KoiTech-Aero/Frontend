import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import PesquisarNorma from './pages/PesquisarNorma.jsx'
import { createBrowserRouter, RouterProvider } from 'react-router'


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/pesquisarNorma",
    element: <PesquisarNorma />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>,
)
