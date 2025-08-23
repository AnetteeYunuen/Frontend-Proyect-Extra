import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const { login } = useAuth()
  const navigate = useNavigate()

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    try {
      // Producción: await login(email, password)  // ← esto llamará a tu AUTH
      await login(email, password) // demo
      navigate('/app')
    } catch {
      setError('No se pudo iniciar sesión')
    }
  }

  return (
    <div style={{maxWidth: 400, margin: '40px auto'}}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={onSubmit} style={{display: 'grid', gap: 8}}>
        <input type="email" placeholder="Email" value={email}
               onChange={(e)=>setEmail(e.target.value)} required />
        <input type="password" placeholder="Contraseña" value={password}
               onChange={(e)=>setPassword(e.target.value)} required />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{color: 'red'}}>{error}</p>}
      <p style={{fontSize: 12, marginTop: 8}}>
        Luego esto llamará a tu API de auth en Mongo Atlas y guardará un JWT.
      </p>
    </div>
  )
}
