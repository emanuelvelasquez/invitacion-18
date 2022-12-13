import { useEffect } from 'react'
import { ThemeProvider } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'

import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import React from 'react'

import theme from './assets/theme'

import PaginaPrincipal from './pages/PaginaPrincipal'
import TablaInvitados from './pages/TablaInvitados'

function App() {
  const { pathname } = useLocation()

  useEffect(() => {
    document.documentElement.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [pathname])

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Routes>
        <Route path="/" element={<PaginaPrincipal />} />
        <Route path="Tabla" element={<TablaInvitados />} />
      </Routes>
    </ThemeProvider>
  )
}

export default App
