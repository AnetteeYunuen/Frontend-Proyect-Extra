import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)
export const useAuth = () => useContext(AuthContext)

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const isAuthenticated = !!token

  // Limpia un token 
  useEffect(() => {
    if (token === 'dev-token') {
      localStorage.removeItem('token')
      setToken(null)
    }
  }, [])

  async function login(email, password) {
    const url = `${import.meta.env.VITE_AUTH_API_URL}/auth/login`
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password })
    })
    if (!res.ok) {
      const txt = await res.text().catch(() => '')
      throw new Error(`Login failed (${res.status}) ${txt}`)
    }
    const { token } = await res.json()
    setToken(token)
    localStorage.setItem('token', token)
  }

  function logout() {
    setToken(null)
    localStorage.removeItem('token')
  }

  return (
    <AuthContext.Provider value={{ token, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}
