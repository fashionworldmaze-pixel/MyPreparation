import { useEffect } from 'react'
import { useTasks } from '../store/useTasks'
import { ensureNotificationPermission, notify, beep } from '../lib/notifications'

export default function ReminderScheduler() {
  const { tasks } = useTasks()

  useEffect(() => {
    let timers = []
    ensureNotificationPermission()
    const now = new Date()
    tasks.forEach(t => {
      if (!t.reminderTime || t.completed) return
      const [hh, mm] = t.reminderTime.split(':').map(Number)
      const when = new Date(t.date)
      when.setHours(hh, mm, 0, 0)
      const delay = when.getTime() - now.getTime()
      if (delay > 0 && delay < 24*60*60*1000) {
        const id = setTimeout(() => {
          notify('Reminder', { body: t.title + (t.subject ? ` · ${t.subject}` : '') })
          beep()
        }, delay)
        timers.push(id)
      }
    })
    return () => { timers.forEach(clearTimeout) }
  }, [tasks])

  return null
}