import mongoose from 'mongoose';

const quoteSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  service: String,
  budget: String,
  timeline: String,
  message: String,
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  status: { type: String, default: 'Pending' },
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Quote', quoteSchema); 