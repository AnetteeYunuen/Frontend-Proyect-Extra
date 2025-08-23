import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext.jsx'

export default function Dashboard() {
  const { token } = useAuth()
  const [items, setItems] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function load() {
      try {
        // Cuando tengas tu backend de datos:
        // const res = await fetch(`${import.meta.env.VITE_DATA_API_URL}/items`, {
        //   headers: { Authorization: `Bearer ${token}` }
        // })
        // if (!res.ok) throw new Error('Error al cargar')
        // const data = await res.json()
        // setItems(data)

        // Demo (sin backend):
        setItems([{ id: 1, name: 'Ejemplo 1' }, { id: 2, name: 'Ejemplo 2' }])
      } catch {
        setError('No se pudo cargar datos')
      }
    }
    load()
  }, [token])

  if (error) return <p style={{color:'red'}}>{error}</p>
  if (!items) return <p>Cargando...</p>

  return (
    <div style={{padding: 16}}>
      <h2>Datos</h2>
      <ul>{items.map(i => <li key={i.id}>{i.name}</li>)}</ul>
    </div>
  )
}
