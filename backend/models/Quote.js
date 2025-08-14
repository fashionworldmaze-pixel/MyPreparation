import mongoose from 'mongoose'

const QuoteSchema = new mongoose.Schema(
	{
		text: { type: String, required: true },
		author: { type: String },
		addedBy: { type: String, default: 'seed' },
	},
	{ timestamps: true }
)

export default mongoose.model('Quote', QuoteSchema)