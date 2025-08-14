import { create } from 'zustand'
import { api } from '../lib/api'
import { isSameDay } from 'date-fns'

const subjects = [
  { key: 'java', label: 'Java' },
  { key: 'javascript', label: 'JavaScript' },
  { key: 'node', label: 'Node.js' },
  { key: 'mongodb', label: 'MongoDB' },
  { key: 'react', label: 'React' },
  { key: 'db', label: 'DB/REST API' },
  { key: 'Array', label: 'Array' },
  { key: 'String', label: 'String' },
  { key: 'Stack', label: 'Stack' },
  { key: 'Queue', label: 'Queue' },
  { key: 'Linked List', label: 'Linked List' },
  { key: 'Hashing', label: 'Hashing' },
  { key: '2 Pointer', label: '2 Pointer' },
  { key: 'Sliding Window', label: 'Sliding Window' },
  { key: 'System Design', label: 'System Design' },
  { key: 'OOPS', label: 'OOPS' },
  { key: 'Machine Level Coding', label: 'Machine Level Coding' },
]

export const useTasks = create((set, get) => ({
  tasks: [],
  subjects,
  today: new Date(),
  streak: Number(localStorage.getItem('streak') || '0'),

  async loadToday() {
    const date = get().today
    const day = date.toISOString().slice(0,10)
    const tasks = await api.listTasks({ date: day })
    set({ tasks })
    get().computeStreak()
  },

  async addTask(task) {
    const created = await api.createTask(task)
    set({ tasks: [created, ...get().tasks] })
    get().computeStreak()
  },

  async toggleComplete(id, completed) {
    const updated = await api.updateTask(id, { completed })
    set({ tasks: get().tasks.map(t => t._id === id ? updated : t) })
    get().computeStreak()
  },

  async removeTask(id) {
    await api.deleteTask(id)
    set({ tasks: get().tasks.filter(t => t._id !== id) })
    get().computeStreak()
  },

  computeStreak() {
    // Simple heuristic: increment when all tasks of a day are completed
    const all = get().tasks
    const today = get().today
    const hasTasksToday = all.some(t => isSameDay(new Date(t.date), today))
    const missed = all.some(t => isSameDay(new Date(t.date), today) && !t.completed)
    const prev = Number(localStorage.getItem('streak') || '0')
    const lastDay = localStorage.getItem('streakLastDay') || ''
    const todayStr = today.toISOString().slice(0,10)
    if (hasTasksToday && !missed && lastDay !== todayStr) {
      const next = prev + 1
      localStorage.setItem('streak', String(next))
      localStorage.setItem('streakLastDay', todayStr)
      set({ streak: next })
    } else {
      set({ streak: prev })
    }
  },
}))