import mongoose from 'mongoose';

const inquirySchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  date: { type: Date, default: Date.now }
});

export default mongoose.model('Inquiry', inquirySchema); 