import { useMemo } from 'react'

const images = [
  'nature,mountain',
  'city,night',
  'space,stars',
  'abstract,black',
  'technology,circuit',
]

export default function Background() {
  const index = useMemo(() => {
    const day = Math.floor(Date.now() / (24*60*60*1000))
    return day % images.length
  }, [])

  const query = images[index]
  const url = `https://source.unsplash.com/1600x900/?${encodeURIComponent(query)}`

  return (
    <div className="fixed inset-0 -z-10 opacity-10 bg-cover bg-center" style={{ backgroundImage: `url(${url})` }} />
  )
}