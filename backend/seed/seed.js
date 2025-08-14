import dotenv from 'dotenv'
import { connectToDatabase } from '../src/db.js'
import Task from '../models/Task.js'
import Quote from '../models/Quote.js'
import Setting from '../models/Setting.js'

dotenv.config()

async function run() {
	await connectToDatabase(process.env.MONGO_URI)
	await Promise.all([
		Task.deleteMany({}),
		Quote.deleteMany({}),
		Setting.deleteMany({ key: 'why' }),
	])

	const today = new Date()
	today.setHours(0,0,0,0)

	const sampleTasks = [
		{ title: 'Practice Arrays basics', subject: 'Array', date: today, reminderTime: '19:00' },
		{ title: 'Study Java OOP', subject: 'java', date: today, reminderTime: '09:00' },
		{ title: 'Build CRUD API in Node', subject: 'node', date: today, reminderTime: '16:00' },
		{ title: 'Revise MongoDB indexes', subject: 'mongodb', date: today },
		{ title: 'React hooks practice', subject: 'react', date: today },
	]
	await Task.insertMany(sampleTasks)

	await Quote.insertMany([
		{ text: 'Discipline equals freedom.', author: 'Jocko Willink' },
		{ text: 'The secret of getting ahead is getting started.', author: 'Mark Twain' },
		{ text: 'You do not rise to the level of your goals. You fall to the level of your systems.', author: 'James Clear' },
	])

	await Setting.findOneAndUpdate(
		{ key: 'why' },
		{ value: 'Crack Zoho SDE in 2 months for ₹11 LPA. Financial independence and growth.' },
		{ upsert: true }
	)

	console.log('Seeded sample data')
	process.exit(0)
}

run().catch((e) => {
	console.error(e)
	process.exit(1)
})