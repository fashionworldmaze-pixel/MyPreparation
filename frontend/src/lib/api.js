export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'

let authToken = localStorage.getItem('token') || ''
export function setToken(token) {
	authToken = token
	localStorage.setItem('token', token)
}

async function request(path, options = {}) {
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