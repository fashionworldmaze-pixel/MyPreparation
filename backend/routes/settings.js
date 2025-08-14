import { Router } from 'express'
import Setting from '../models/Setting.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/why', async (_req, res) => {
	const s = await Setting.findOne({ key: 'why' })
	res.json({ value: s?.value || '' })
})

router.post('/why', requireAuth, async (req, res) => {
	const { value } = req.body
	const s = await Setting.findOneAndUpdate(
		{ key: 'why' },
		{ value },
		{ upsert: true, new: true }
	)
	res.json({ value: s.value })
})

export default router