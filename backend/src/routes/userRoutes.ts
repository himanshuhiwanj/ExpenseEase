import express from 'express';
import { registerUser, loginUser, protect } from './Auth.js'; // Import the functions from the Auth file

const router = express.Router();

// Public routes for user authentication
router.post('/register', registerUser);
router.post('/login', loginUser);


// Protected route to get user profile
router.get('/profile', protect, (req, res) => {
  // The 'protect' middleware ensures that a valid token is present
  // and attaches the user object to the request.
  if (req.user) {
    res.json(req.user);
  } else {
    res.status(404).json({ message: 'User not found' });
  }
});

export default router;
