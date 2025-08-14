export async function ensureNotificationPermission() {
  if (!('Notification' in window)) return false
  if (Notification.permission === 'granted') return true
  if (Notification.permission === 'denied') return false
  const perm = await Notification.requestPermission()
  return perm === 'granted'
}

export function notify(title, options = {}) {
  if (!('Notification' in window)) return
  try {
    const n = new Notification(title, options)
    if (options.soundUrl) {
      const audio = new Audio(options.soundUrl)
      audio.play().catch(() => {})
    }
    return n
  } catch (_) {
    // ignore
  }
}

export function beep(durationMs = 300, frequency = 880, volume = 0.1) {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)()
    const osc = ctx.createOscillator()
    const gain = ctx.createGain()
    osc.type = 'sine'
    osc.frequency.value = frequency
    gain.gain.value = volume
    osc.connect(gain)
    gain.connect(ctx.destination)
    osc.start()
    setTimeout(() => { osc.stop(); ctx.close() }, durationMs)
  } catch (_) {
    // ignore
  }
}