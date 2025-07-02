import express from 'express';
import { verifyToken, isAdmin } from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import Portfolio from '../models/Portfolio.js';
import Blog from '../models/Blog.js';
import Inquiry from '../models/Inquiry.js';
import Quote from '../models/Quote.js';

const router = express.Router();

// Portfolio CRUD
router.post('/portfolio', verifyToken, isAdmin, upload.array('images'), async (req, res) => {
  try {
    const images = req.files.map(f => `/uploads/${f.filename}`);
    const { title, description, category, client, date, published } = req.body;
    const item = new Portfolio({ title, description, category, client, date, published, images });
    await item.save();
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/portfolio', verifyToken, isAdmin, async (req, res) => {
  const items = await Portfolio.find();
  res.json(items);
});

router.put('/portfolio/:id', verifyToken, isAdmin, upload.array('images'), async (req, res) => {
  try {
    const images = req.files.length ? req.files.map(f => `/uploads/${f.filename}`) : undefined;
    const update = { ...req.body };
    if (images) update.images = images;
    const item = await Portfolio.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/portfolio/:id', verifyToken, isAdmin, async (req, res) => {
  await Portfolio.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Blog CRUD
router.post('/blog', verifyToken, isAdmin, upload.single('coverImage'), async (req, res) => {
  try {
    const { title, content, category, published, author } = req.body;
    const coverImage = req.file ? `/uploads/${req.file.filename}` : '';
    const blog = new Blog({ title, content, category, published, author, coverImage });
    await blog.save();
    res.status(201).json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/blog', verifyToken, isAdmin, async (req, res) => {
  const blogs = await Blog.find();
  res.json(blogs);
});

router.put('/blog/:id', verifyToken, isAdmin, upload.single('coverImage'), async (req, res) => {
  try {
    const update = { ...req.body };
    if (req.file) update.coverImage = `/uploads/${req.file.filename}`;
    const blog = await Blog.findByIdAndUpdate(req.params.id, update, { new: true });
    res.json(blog);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.delete('/blog/:id', verifyToken, isAdmin, async (req, res) => {
  await Blog.findByIdAndDelete(req.params.id);
  res.json({ message: 'Deleted' });
});

// Get all inquiries
router.get('/inquiries', verifyToken, isAdmin, async (req, res) => {
  const inquiries = await Inquiry.find().sort({ date: -1 });
  res.json(inquiries);
});

// Get all quotes
router.get('/quotes', verifyToken, isAdmin, async (req, res) => {
  const quotes = await Quote.find().sort({ date: -1 });
  res.json(quotes);
});

// Update quote status
router.put('/quotes/:id', verifyToken, isAdmin, async (req, res) => {
  const { status } = req.body;
  const quote = await Quote.findByIdAndUpdate(req.params.id, { status }, { new: true });
  res.json(quote);
});

export default router; 