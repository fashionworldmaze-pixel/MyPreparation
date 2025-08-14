import { Router } from 'express'
import Task from '../models/Task.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', requireAuth, async (req, res) => {
	const { date, subject } = req.query
	const filter = {}
	if (date) {
		const start = new Date(date)
		start.setHours(0,0,0,0)
		const end = new Date(start)
		end.setDate(end.getDate() + 1)
		filter.date = { $gte: start, $lt: end }
	}
	if (subject) {
		filter.subject = subject
	}
	const tasks = await Task.find(filter).sort({ createdAt: -1 })
	res.json(tasks)
})

router.post('/', requireAuth, async (req, res) => {
	const task = await Task.create(req.body)
	res.status(201).json(task)
})

router.put('/:id', requireAuth, async (req, res) => {
	const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true })
	res.json(task)
})

router.delete('/:id', requireAuth, async (req, res) => {
	await Task.findByIdAndDelete(req.params.id)
	res.json({ ok: true })
})

router.get('/progress/summary', requireAuth, async (_req, res) => {
	const agg = await Task.aggregate([
		{ $group: { _id: '$subject', total: { $sum: 1 }, done: { $sum: { $cond: ['$completed', 1, 0] } } } },
		{ $project: { _id: 0, subject: '$_id', total: 1, done: 1 } },
	])
	res.json(agg)
})

router.get('/export/csv', requireAuth, async (_req, res) => {
	const tasks = await Task.find({}).sort({ date: 1 })
	const header = 'title,subject,date,reminderTime,completed\n'
	const rows = tasks.map(t => [
		escapeCsv(t.title),
		escapeCsv(t.subject),
		new Date(t.date).toISOString().slice(0,10),
		escapeCsv(t.reminderTime || ''),
		t.completed ? 'true' : 'false',
	].join(','))
	res.setHeader('Content-Type', 'text/csv')
	res.setHeader('Content-Disposition', 'attachment; filename="tasks.csv"')
	res.send(header + rows.join('\n'))
})

function escapeCsv(value) {
	if (value == null) return ''
	const s = String(value)
	if (s.includes(',') || s.includes('\n') || s.includes('"')) {
		return '"' + s.replace(/"/g, '""') + '"'
	}
	return s
}

export default router