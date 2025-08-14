import { useState } from 'react'

export default function QuotesManager() {
  const [text, setText] = useState('')
  const [author, setAuthor] = useState('')
  const [saved, setSaved] = useState(false)

  async function handleAdd(e) {
    e.preventDefault()
    if (!text.trim()) return
    await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/quotes`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: 'Bearer ' + localStorage.getItem('token') },
      body: JSON.stringify({ text, author }),
    })
    setText('')
    setAuthor('')
    setSaved(true)
    setTimeout(()=>setSaved(false), 1500)
  }

  return (
    <form onSubmit={handleAdd} className="p-4 rounded-lg border border-neutral-800">
      <div className="text-sm text-neutral-400 mb-2">Add Motivational Quote</div>
      <input value={text} onChange={e=>setText(e.target.value)} placeholder="Quote" className="w-full mb-2 px-3 py-2 rounded bg-neutral-950 border border-neutral-800" />
      <input value={author} onChange={e=>setAuthor(e.target.value)} placeholder="Author (optional)" className="w-full mb-2 px-3 py-2 rounded bg-neutral-950 border border-neutral-800" />
      <button className="px-3 py-2 rounded bg-gold text-black">Add Quote</button>
      {saved && <span className="ml-2 text-xs text-neutral-400">Saved</span>}
    </form>
  )
}