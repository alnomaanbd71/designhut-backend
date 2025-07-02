import express from 'express';
import Portfolio from '../models/Portfolio.js';
import Blog from '../models/Blog.js';
import Inquiry from '../models/Inquiry.js';
import Quote from '../models/Quote.js';

const router = express.Router();

// Get all published portfolio items
router.get('/portfolio', async (req, res) => {
  const items = await Portfolio.find({ published: true });
  res.json(items);
});

// Get all published blog posts
router.get('/blog', async (req, res) => {
  const blogs = await Blog.find({ published: true }).sort({ createdAt: -1 });
  res.json(blogs);
});

// Get single blog post by ID
router.get('/blog/:id', async (req, res) => {
  const blog = await Blog.findById(req.params.id);
  if (!blog || !blog.published) return res.status(404).json({ message: 'Not found' });
  res.json(blog);
});

// Contact form submission
router.post('/contact', async (req, res) => {
  try {
    const inquiry = new Inquiry(req.body);
    await inquiry.save();
    res.status(201).json({ message: 'Inquiry submitted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Quote form submission
router.post('/quote', async (req, res) => {
  try {
    const quote = new Quote(req.body);
    await quote.save();
    res.status(201).json({ message: 'Quote submitted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router; 