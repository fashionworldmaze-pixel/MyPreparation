import { useEffect, useRef, useState } from 'react'
import { notify } from '../lib/notifications'

export default function FocusMode({ initialMinutes = 25, taskTitle = 'Focus' }) {
  const [minutes, setMinutes] = useState(initialMinutes)
  const [seconds, setSeconds] = useState(0)
  const [running, setRunning] = useState(false)
  const intervalRef = useRef(null)

  useEffect(() => {
    if (!running) return
    intervalRef.current = setInterval(() => {
      setSeconds((s) => {
        if (s === 0) {
          setMinutes((m) => {
            if (m === 0) {
              clearInterval(intervalRef.current)
              notify('Time up!', { body: `${taskTitle} session finished` })
              setRunning(false)
              return 0
            }
            return m - 1
          })
          return 59
        }
        return s - 1
      })
    }, 1000)
    return () => clearInterval(intervalRef.current)
  }, [running])

  const mm = String(minutes).padStart(2, '0')
  const ss = String(seconds).padStart(2, '0')

  return (
    <div className="fixed inset-0 bg-black text-white grid place-items-center z-50">
      <div className="text-center">
        <div className="text-6xl font-bold tracking-tight">{mm}:{ss}</div>
        <div className="mt-2 text-neutral-400">{taskTitle}</div>
        <div className="mt-6 flex items-center justify-center gap-3">
          {!running ? (
            <button onClick={()=>setRunning(true)} className="px-4 py-2 rounded bg-gold text-black">Start</button>
          ) : (
            <button onClick={()=>setRunning(false)} className="px-4 py-2 rounded border border-neutral-800">Pause</button>
          )}
          <button onClick={()=>{ setMinutes(initialMinutes); setSeconds(0); setRunning(false) }} className="px-4 py-2 rounded border border-neutral-800">Reset</button>
        </div>
      </div>
    </div>
  )
}