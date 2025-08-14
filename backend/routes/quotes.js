import { Router } from 'express'
import Quote from '../models/Quote.js'
import { requireAuth } from '../middleware/auth.js'

const router = Router()

router.get('/', async (_req, res) => {
	const quotes = await Quote.find({}).sort({ createdAt: -1 })
	res.json(quotes)
})

router.post('/', requireAuth, async (req, res) => {
	const quote = await Quote.create(req.body)
	res.status(201).json(quote)
})

router.get('/random', async (_req, res) => {
	const count = await Quote.countDocuments()
	if (count === 0) return res.json(null)
	const rand = Math.floor(Math.random() * count)
	const quote = await Quote.findOne().skip(rand)
	res.json(quote)
})

export default router