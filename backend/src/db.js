import mongoose from 'mongoose'

export async function connectToDatabase(mongoUri) {
	if (!mongoUri) {
		throw new Error('MONGO_URI missing')
	}
	mongoose.set('strictQuery', true)
	await mongoose.connect(mongoUri, {
		serverSelectionTimeoutMS: 10000,
	})
	return mongoose.connection
}