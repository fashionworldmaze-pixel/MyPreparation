import mongoose from 'mongoose'

const TaskSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		notes: { type: String },
		subject: {
			type: String,
			enum: [
				'java', 'javascript', 'node', 'mongodb', 'react', 'db',
				'Array','String','Stack','Queue','Linked List','Hashing','2 Pointer','Sliding Window',
				'System Design','OOPS','Machine Level Coding'
			],
			required: true,
		},
		date: { type: Date, required: true }, // day this task is planned for (00:00 local)
		reminderTime: { type: String }, // HH:mm in 24h local time
		completed: { type: Boolean, default: false },
	},
	{ timestamps: true }
)

export default mongoose.model('Task', TaskSchema)