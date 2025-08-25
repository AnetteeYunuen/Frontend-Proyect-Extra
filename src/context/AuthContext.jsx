import { createContext, useContext, useState } from 'react'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))

  // ⬇️ Cuando conectes tu backend de AUTH (Mongo Atlas), descomenta y usa esto:
async function login(email, password) {
  const res = await fetch(`${import.meta.env.VITE_AUTH_API_URL}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password })
  })
  if (!res.ok) throw new Error('Credenciales inválidas')
  const { token } = await res.json()
  setToken(token)
  localStorage.setItem('token', token)
}


  // ⬇️ Modo demo (sin backend): acepta cualquier email/pass
  async function login() {
    const fake = 'dev-token'
    setToken(fake)
    localStorage.setItem('token', fake)
  }

  function logout() {
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ token, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  )
}
