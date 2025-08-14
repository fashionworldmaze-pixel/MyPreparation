import { useState } from 'react'
import { BrowserRouter, Routes, Route, NavLink } from 'react-router-dom'
import './App.css'
import Login from './components/Login.jsx'
import Motivation from './components/Motivation.jsx'
import TaskList from './components/TaskList.jsx'
import ProgressBars from './components/ProgressBars.jsx'
import ReminderScheduler from './components/ReminderScheduler.jsx'
import DarkModeToggle from './components/DarkModeToggle.jsx'
import Background from './components/Background.jsx'
import QuotesManager from './components/QuotesManager.jsx'
import FocusMode from './components/FocusMode.jsx'

const subjects = [
  { key: 'java', label: 'Java' },
  { key: 'javascript', label: 'JavaScript' },
  { key: 'node', label: 'Node.js' },
  { key: 'mongodb', label: 'MongoDB' },
  { key: 'react', label: 'React' },
  { key: 'db', label: 'DB/REST API' },
]

const dsa = [
  'Array','String','Stack','Queue','Linked List','Hashing','2 Pointer','Sliding Window'
]

const others = [ 'System Design', 'OOPS', 'Machine Level Coding' ]

function Shell({ children }) {
  const [showFocus, setShowFocus] = useState(false)
  return (
    <div className="min-h-screen grid grid-cols-[260px_1fr] bg-black text-white">
      <Background />
      {showFocus && <FocusMode taskTitle="Deep Focus" />}
      <aside className="border-r border-neutral-800 p-4">
        <div className="text-2xl font-poppins font-semibold">Prep<span className="text-gold">Boss</span></div>
        <nav className="mt-6 space-y-4">
          <div>
            <div className="text-xs uppercase text-neutral-400 mb-2">Core Skills</div>
            <div className="flex flex-col gap-1">
              {subjects.map(s => (
                <NavLink key={s.key} to={`/subject/${s.key}`} className={({isActive}) => `px-3 py-2 rounded hover:bg-neutral-900 ${isActive ? 'bg-neutral-900 text-gold' : 'text-neutral-200'}`}>{s.label}</NavLink>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase text-neutral-400 mb-2">DSA</div>
            <div className="flex flex-col gap-1">
              {dsa.map(s => (
                <NavLink key={s} to={`/dsa/${encodeURIComponent(s)}`} className={({isActive}) => `px-3 py-2 rounded hover:bg-neutral-900 ${isActive ? 'bg-neutral-900 text-gold' : 'text-neutral-200'}`}>{s}</NavLink>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs uppercase text-neutral-400 mb-2">Other</div>
            <div className="flex flex-col gap-1">
              {others.map(s => (
                <NavLink key={s} to={`/other/${encodeURIComponent(s)}`} className={({isActive}) => `px-3 py-2 rounded hover:bg-neutral-900 ${isActive ? 'bg-neutral-900 text-gold' : 'text-neutral-200'}`}>{s}</NavLink>
              ))}
            </div>
          </div>
        </nav>
      </aside>
      <main className="p-6">
        <header className="flex items-center justify-between mb-6">
          <h1 className="text-xl font-semibold">Dashboard</h1>
          <div className="flex items-center gap-2">
            <DarkModeToggle />
            <button onClick={()=>setShowFocus(true)} className="px-3 py-2 rounded border border-neutral-800 hover:bg-neutral-900">Focus Mode</button>
            <button className="px-3 py-2 rounded bg-gold text-black">+ Task</button>
          </div>
        </header>
        <div className="grid gap-6 grid-cols-1 xl:grid-cols-3">
          {children}
        </div>
      </main>
    </div>
  )
}

function Dashboard() {
  return (
    <>
      <ReminderScheduler />
      <div className="xl:col-span-2 space-y-6">
        <Motivation />
        <TaskList />
      </div>
      <div className="space-y-6">
        <section className="p-4 rounded-lg border border-neutral-800">
          <div className="text-sm text-neutral-400">Streak</div>
          <div className="mt-2 text-3xl font-semibold">{Number(localStorage.getItem('streak') || '0')} days 🔥</div>
        </section>
        <ProgressBars />
        <QuotesManager />
        <section className="p-4 rounded-lg border border-neutral-800">
          <div className="text-sm text-neutral-400 mb-2">Export</div>
          <a className="text-gold underline" href={(import.meta.env.VITE_API_URL || 'http://localhost:5000') + '/api/tasks/export/csv'} target="_blank">Download tasks CSV</a>
        </section>
      </div>
    </>
  )
}

export default function App() {
  const [loggedIn, setLoggedIn] = useState(!!localStorage.getItem('token'))

  if (!loggedIn) return <Login onSuccess={() => setLoggedIn(true)} />

  return (
    <BrowserRouter>
      <Shell>
        <Routes>
          <Route path="/*" element={<Dashboard />} />
        </Routes>
      </Shell>
    </BrowserRouter>
  )
}
