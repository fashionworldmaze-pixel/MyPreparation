import { useState } from 'react'
import { api, setToken } from '../lib/api'

export default function Login({ onSuccess }) {
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    setLoading(true)
    setError('')
    try {
      const { token } = await api.login(password)
      setToken(token)
      onSuccess?.()
    } catch (e) {
      setError('Invalid password')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm p-6 rounded-lg border border-neutral-800 bg-black">
        <div className="text-2xl font-poppins font-semibold mb-6 text-center">Prep<span className="text-gold">Boss</span></div>
        <label className="block text-sm text-neutral-400">Password</label>
        <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="mt-2 w-full px-3 py-2 rounded bg-neutral-950 border border-neutral-800 focus:outline-none focus:border-gold" placeholder="Enter app password" />
        {error && <div className="text-red-400 text-sm mt-2">{error}</div>}
        <button disabled={loading} className="mt-4 w-full px-3 py-2 rounded bg-gold text-black disabled:opacity-60">{loading ? 'Signing in...' : 'Sign In'}</button>
      </form>
    </div>
  )
}