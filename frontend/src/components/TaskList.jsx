import { useEffect, useState } from 'react'
import { useTasks } from '../store/useTasks'

export default function TaskList() {
  const { tasks, loadToday, addTask, toggleComplete, removeTask, subjects } = useTasks()
  const [title, setTitle] = useState('')
  const [subject, setSubject] = useState(subjects[0].key)
  const [time, setTime] = useState('')

  useEffect(() => { loadToday() }, [])

  async function handleAdd(e) {
    e.preventDefault()
    if (!title.trim()) return
    const date = new Date()
    date.setHours(0,0,0,0)
    await addTask({ title, subject, date, reminderTime: time })
    setTitle('')
    setTime('')
  }

  return (
    <div className="p-4 rounded-lg border border-neutral-800">
      <form onSubmit={handleAdd} className="flex flex-col md:flex-row gap-2 mb-3">
        <input className="flex-1 px-3 py-2 rounded bg-neutral-950 border border-neutral-800 focus:outline-none focus:border-gold" placeholder="Add a task..." value={title} onChange={e=>setTitle(e.target.value)} />
        <select value={subject} onChange={e=>setSubject(e.target.value)} className="px-3 py-2 rounded bg-neutral-950 border border-neutral-800">
          {subjects.map(s => <option key={s.key} value={s.key}>{s.label}</option>)}
        </select>
        <input type="time" value={time} onChange={e=>setTime(e.target.value)} className="px-3 py-2 rounded bg-neutral-950 border border-neutral-800" />
        <button className="px-3 py-2 rounded bg-gold text-black">Add</button>
      </form>
      <div className="space-y-2">
        {tasks.map(t => (
          <div key={t._id} className="p-3 rounded border border-neutral-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <input type="checkbox" checked={t.completed} onChange={e=>toggleComplete(t._id, e.target.checked)} />
              <div>
                <div className="font-medium">{t.title}</div>
                <div className="text-xs text-neutral-400">{t.subject} {t.reminderTime ? `· ${t.reminderTime}` : ''}</div>
              </div>
            </div>
            <button onClick={()=>removeTask(t._id)} className="px-2 py-1 text-xs rounded border border-neutral-800 hover:bg-neutral-900">Delete</button>
          </div>
        ))}
      </div>
    </div>
  )
}