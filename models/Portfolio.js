import mongoose from 'mongoose';

const portfolioSchema = new mongoose.Schema({
  title: String,
  description: String,
  category: String,
  images: [String],
  client: String,
  date: Date,
  published: { type: Boolean, default: true }
}, { timestamps: true });

export default mongoose.model('Portfolio', portfolioSchema); 