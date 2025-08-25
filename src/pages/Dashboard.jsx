import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Dashboard() {
  const { token } = useAuth()
  const [data, setData] = useState({ items: [], total: 0, page: 1, limit: 20 })
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      setError(null)
      try {
        const res = await fetch(`${import.meta.env.VITE_DATA_API_URL}/movies?limit=10&page=1`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        if (!res.ok) throw new Error(`Error ${res.status}`)
        const json = await res.json()
        setData(json)
      } catch (e) {
        setError('No se pudo cargar películas')
      }
    }
    if (token) load()
  }, [token])

  if (error) return <p style={{color:'red'}}>{error}</p>
  if (!data.items.length) return <p>Cargando...</p>

  return (
    <div style={{padding:16}}>
      <h2>Películas</h2>
      <ul>
        {data.items.map(m => (
          <li key={m._id}>
            <strong>{m.title || m.name}</strong> {m.year ? `(${m.year})` : ''}
            {m.genres && Array.isArray(m.genres) ? ` — ${m.genres.join(', ')}` : ''}
          </li>
        ))}
      </ul>
      <p>Total: {data.total}</p>
    </div>
  )
}
