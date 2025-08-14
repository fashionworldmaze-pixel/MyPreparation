import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { connectToDatabase } from './db.js'
import authRouter from '../routes/auth.js'
import tasksRouter from '../routes/tasks.js'
import quotesRouter from '../routes/quotes.js'
import settingsRouter from '../routes/settings.js'

dotenv.config()

const app = express()
app.use(cors())
app.use(express.json())

app.get('/health', (_req, res) => res.json({ ok: true }))

app.use('/api/auth', authRouter)
app.use('/api/tasks', tasksRouter)
app.use('/api/quotes', quotesRouter)
app.use('/api/settings', settingsRouter)

const PORT = process.env.PORT || 5000

async function start() {
	try {
		await connectToDatabase(process.env.MONGO_URI)
		app.listen(PORT, () => {
			console.log(`API listening on :${PORT}`)
		})
	} catch (err) {
		console.error('Failed to start server:', err)
		process.exit(1)
	}
}

start()