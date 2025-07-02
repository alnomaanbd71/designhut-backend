import express from 'express';
import { verifyToken } from '../middleware/auth.js';
import User from '../models/User.js';

const router = express.Router();

// Get user profile
router.get('/profile', verifyToken, async (req, res) => {
  const user = await User.findById(req.user.id).select('-password');
  res.json(user);
});

export default router; 