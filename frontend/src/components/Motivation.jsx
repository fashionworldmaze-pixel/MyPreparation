import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function Motivation() {
  const [why, setWhy] = useState('')
  const [quote, setQuote] = useState(null)
  const [editing, setEditing] = useState(false)
  const [tempWhy, setTempWhy] = useState('')

  useEffect(() => {
    ;(async () => {
      const w = await api.getWhy()
      setWhy(w.value || '')
      const q = await api.randomQuote()
      setQuote(q)
    })()
  }, [])

  async function saveWhy() {
    const res = await api.saveWhy(tempWhy)
    setWhy(res.value)
    setEditing(false)
  }

  return (
    <div className="p-4 rounded-lg border border-neutral-800">
      <div className="text-sm text-neutral-400">Why I'm doing this</div>
      {!editing ? (
        <>
          <div className="mt-2 text-lg font-medium">{why || 'Set your reason to stay motivated.'}</div>
          <button onClick={()=>{ setEditing(true); setTempWhy(why) }} className="mt-2 px-3 py-1 text-xs rounded border border-neutral-800 hover:bg-neutral-900">Edit</button>
        </>
      ) : (
        <div className="mt-2">
          <textarea value={tempWhy} onChange={e=>setTempWhy(e.target.value)} className="w-full h-24 px-3 py-2 rounded bg-neutral-950 border border-neutral-800"></textarea>
          <div className="mt-2 flex gap-2">
            <button onClick={saveWhy} className="px-3 py-1 text-xs rounded bg-gold text-black">Save</button>
            <button onClick={()=>setEditing(false)} className="px-3 py-1 text-xs rounded border border-neutral-800">Cancel</button>
          </div>
        </div>
      )}

      <div className="mt-6">
        <div className="text-sm text-neutral-400 mb-2">Quote</div>
        {quote ? (
          <div className="text-neutral-200 italic">“{quote.text}” {quote.author ? `— ${quote.author}` : ''}</div>
        ) : (
          <div className="text-neutral-400">No quotes yet.</div>
        )}
      </div>
    </div>
  )
}