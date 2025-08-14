import { useEffect, useState } from 'react'

export default function DarkModeToggle() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') !== 'light')

  useEffect(() => {
    localStorage.setItem('theme', dark ? 'dark' : 'light')
    document.documentElement.classList.toggle('dark', dark)
  }, [dark])

  return (
    <button onClick={()=>setDark(!dark)} className="px-3 py-2 rounded border border-neutral-800">
      {dark ? 'Dark' : 'Light'}
    </button>
  )
}