import { Router } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()

router.post('/login', (req, res) => {
	const { password } = req.body || {}
	if (!password) return res.status(400).json({ error: 'Password required' })
	if (password !== process.env.APP_PASSWORD) return res.status(401).json({ error: 'Invalid password' })
	const token = jwt.sign({ role: 'owner' }, process.env.JWT_SECRET, { expiresIn: '7d' })
	return res.json({ token })
})

export default router