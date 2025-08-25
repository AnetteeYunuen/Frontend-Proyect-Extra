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
      await login(email, password)        // ← si falla, lanza error y NO navega
      navigate('/app')
    } catch (err) {
      setError('Credenciales inválidas')
    }
  }

  return (
    <div style={{maxWidth: 400, margin:'40px auto'}}>
      <h2>Iniciar sesión</h2>
      <form onSubmit={onSubmit} style={{display:'grid', gap:8}}>
        <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email" required />
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Contraseña" required />
        <button type="submit">Entrar</button>
      </form>
      {error && <p style={{color:'red', marginTop:8}}>{error}</p>}
    </div>
  )
}
