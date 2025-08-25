import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Dashboard() {
  const { token } = useAuth()

  const [items, setItems] = useState([])
  const [total, setTotal] = useState(0)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const baseUrl = (import.meta.env.VITE_DATA_API_URL || '').replace(/\/+$/, '')

  useEffect(() => {
    if (!token || !baseUrl) return
    const ac = new AbortController()

    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await fetch(`${baseUrl}/movies?limit=20&page=1`, {
          headers: { Authorization: `Bearer ${token}` },
          signal: ac.signal
        })
        if (!res.ok) {
          const msg = await res.text().catch(() => '')
          throw new Error(`Error ${res.status} ${msg}`)
        }
        const data = await res.json()
        setItems(data.items || [])
        setTotal(data.total ?? 0)
      } catch (e) {
        if (!ac.signal.aborted) {
          console.error('Error /movies:', e)
          setError('No se pudo cargar películas')
        }
      } finally {
        setLoading(false)
      }
    })()

    return () => ac.abort()
  }, [token, baseUrl])

  if (!baseUrl) return <p style={{color:'red'}}>Falta VITE_DATA_API_URL en el build.</p>
  if (!token) return <p>Inicia sesión…</p>
  if (loading) return <p>Cargando…</p>
  if (error) return <p style={{color:'red'}}>{error}</p>
  if (!items.length) return <p>Sin resultados.</p>

  return (
    <div style={{padding:16}}>
      <h2>Películas</h2>
      <ul>
        {items.map(m => (
          <li key={m._id || m.id}>
            <strong>{m.title || m.name || '(sin título)'}</strong>
            {m.year ? ` (${m.year})` : ''}
            {Array.isArray(m.genres) && m.genres.length ? ` — ${m.genres.join(', ')}` : ''}
          </li>
        ))}
      </ul>
      <p>Total: {total}</p>
    </div>
  )
}
