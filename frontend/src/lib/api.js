export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const IS_MOCK = String(import.meta.env.VITE_MOCK || '') === '1'

let authToken = localStorage.getItem('token') || ''
export function setToken(token) {
	authToken = token
	localStorage.setItem('token', token)
}

async function request(path, options = {}) {
	if (IS_MOCK) return mockRequest(path, options)
	const headers = { 'Content-Type': 'application/json', ...(options.headers || {}) }
	if (authToken) headers['Authorization'] = `Bearer ${authToken}`
	const res = await fetch(`${API_URL}${path}`, { ...options, headers })
	if (!res.ok) {
		const text = await res.text()
		throw new Error(text || res.statusText)
	}
	const contentType = res.headers.get('content-type') || ''
	if (contentType.includes('application/json')) return res.json()
	return res.text()
}

// Mock implementation
let mockWhy = 'Crack Zoho SDE in 2 months for ₹11 LPA. Financial independence and growth.'
let mockQuotes = [
	{ _id: 'q1', text: 'Discipline equals freedom.', author: 'Jocko Willink' },
	{ _id: 'q2', text: 'Start now; get perfect later.', author: 'Unknown' },
]
let idCounter = 1
const today = new Date(); today.setHours(0,0,0,0)
let mockTasks = [
	{ _id: String(idCounter++), title: 'Practice Arrays basics', subject: 'Array', date: today, reminderTime: '19:00', completed: false },
	{ _id: String(idCounter++), title: 'Study Java OOP', subject: 'java', date: today, reminderTime: '09:00', completed: false },
	{ _id: String(idCounter++), title: 'Build CRUD API in Node', subject: 'node', date: today, reminderTime: '16:00', completed: false },
]

async function mockRequest(path, options = {}) {
	const method = (options.method || 'GET').toUpperCase()
	const body = options.body ? JSON.parse(options.body) : null
	await new Promise(r => setTimeout(r, 150))
	if (path === '/api/auth/login' && method === 'POST') {
		if (!body?.password) return json({ error: 'Password required' }, 400)
		return json({ token: 'mock-token' })
	}
	if (path === '/api/settings/why' && method === 'GET') {
		return json({ value: mockWhy })
	}
	if (path === '/api/settings/why' && method === 'POST') {
		mockWhy = body.value || ''
		return json({ value: mockWhy })
	}
	if (path === '/api/quotes/random' && method === 'GET') {
		if (mockQuotes.length === 0) return json(null)
		const idx = Math.floor(Math.random() * mockQuotes.length)
		return json(mockQuotes[idx])
	}
	if (path === '/api/quotes' && method === 'POST') {
		mockQuotes.unshift({ _id: String(Date.now()), text: body.text, author: body.author })
		return json({ ok: true })
	}
	if (path.startsWith('/api/tasks') && method === 'GET') {
		const url = new URL('http://x' + path)
		const day = url.searchParams.get('date')
		let list = mockTasks
		if (day) list = list.filter(t => new Date(t.date).toISOString().slice(0,10) === day)
		return json(list)
	}
	if (path === '/api/tasks' && method === 'POST') {
		const task = { ...body, _id: String(idCounter++), completed: !!body.completed }
		mockTasks.unshift(task)
		return json(task, 201)
	}
	if (path.startsWith('/api/tasks/') && method === 'PUT') {
		const id = path.split('/').pop()
		mockTasks = mockTasks.map(t => t._id === id ? { ...t, ...body } : t)
		const updated = mockTasks.find(t => t._id === id)
		return json(updated)
	}
	if (path.startsWith('/api/tasks/') && method === 'DELETE') {
		const id = path.split('/').pop()
		mockTasks = mockTasks.filter(t => t._id !== id)
		return json({ ok: true })
	}
	if (path === '/api/tasks/progress/summary' && method === 'GET') {
		const map = {}
		for (const t of mockTasks) {
			map[t.subject] ||= { subject: t.subject, total: 0, done: 0 }
			map[t.subject].total += 1
			if (t.completed) map[t.subject].done += 1
		}
		return json(Object.values(map))
	}
	if (path === '/api/tasks/export/csv' && method === 'GET') {
		const header = 'title,subject,date,reminderTime,completed\n'
		const rows = mockTasks.map(t => [t.title, t.subject, new Date(t.date).toISOString().slice(0,10), t.reminderTime || '', t.completed ? 'true' : 'false'].join(','))
		return text(header + rows.join('\n'))
	}
	return json({ error: 'Not found' }, 404)
}

function json(data, status = 200) { return data }
function text(data, status = 200) { return data }

export const api = {
	login: (password) => request('/api/auth/login', { method: 'POST', body: JSON.stringify({ password }) }),
	getWhy: () => request('/api/settings/why'),
	saveWhy: (value) => request('/api/settings/why', { method: 'POST', body: JSON.stringify({ value }) }),
	randomQuote: () => request('/api/quotes/random'),
	listTasks: (params = {}) => request('/api/tasks' + toQuery(params)),
	createTask: (task) => request('/api/tasks', { method: 'POST', body: JSON.stringify(task) }),
	updateTask: (id, patch) => request(`/api/tasks/${id}`, { method: 'PUT', body: JSON.stringify(patch) }),
	deleteTask: (id) => request(`/api/tasks/${id}`, { method: 'DELETE' }),
	exportCsv: () => request('/api/tasks/export/csv'),
	progressSummary: () => request('/api/tasks/progress/summary'),
}

function toQuery(obj) {
	const q = new URLSearchParams()
	Object.entries(obj).forEach(([k, v]) => {
		if (v !== undefined && v !== null && v !== '') q.set(k, v)
	})
	const s = q.toString()
	return s ? `?${s}` : ''
}