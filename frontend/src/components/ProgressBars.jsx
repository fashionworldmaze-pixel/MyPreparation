import { useEffect, useState } from 'react'
import { api } from '../lib/api'

export default function ProgressBars() {
  const [items, setItems] = useState([])

  useEffect(() => {
    api.progressSummary().then(setItems).catch(() => setItems([]))
  }, [])

  return (
    <div className="p-4 rounded-lg border border-neutral-800">
      <div className="text-sm text-neutral-400 mb-2">Progress</div>
      <div className="space-y-3">
        {items.map(it => {
          const pct = it.total ? Math.round((it.done / it.total) * 100) : 0
          return (
            <div key={it.subject}>
              <div className="flex justify-between text-xs text-neutral-400">
                <span>{it.subject}</span><span>{pct}%</span>
              </div>
              <div className="h-2 bg-neutral-900 rounded mt-1">
                <div className="h-2 bg-gold rounded" style={{ width: `${pct}%` }} />
              </div>
            </div>
          )
        })}
        {items.length === 0 && <div className="text-neutral-500 text-sm">No progress yet.</div>}
      </div>
    </div>
  )
}