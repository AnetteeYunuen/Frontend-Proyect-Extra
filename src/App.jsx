import { Routes, Route, Link } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext.jsx'
import ProtectedRoute from './components/ProtectedRoute.jsx'
import Login from './pages/Login.jsx'
import Dashboard from './pages/Dashboard.jsx'

function Navbar() {
  const { isAuthenticated, logout } = useAuth()
  return (
    <nav style={{display:'flex', gap:12, padding:12, borderBottom:'1px solid #ddd'}}>
      <Link to="/">Inicio</Link>
      {isAuthenticated ? (
        <>
          <Link to="/app">Datos</Link>
          <button onClick={logout}>Salir</button>
        </>
      ) : <Link to="/login">Login</Link>}
    </nav>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<div style={{padding:16}}><h1>Frontend </h1><p></p></div>} />
        <Route path="/login" element={<Login />} />
        <Route path="/app" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      </Routes>
    </AuthProvider>
  )
}
