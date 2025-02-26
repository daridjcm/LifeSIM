const jwt = require('jsonwebtoken');
const express = require('express');
const { createUser, loginUser, getCurrentUser } = require('../controllers/user.controller');

const router = express.Router();

// Middleware to verify the token
const verifyToken = (req, res, next) => {
  const token = req.headers['authorization']?.split(' ')[1]; // Get token from Authorization header

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify token
    req.userId = decoded.id; // Attach user ID to the request object
    next(); // Proceed to the next middleware/route handler
  } catch (error) {
    console.error('Token verification error:', error);
    res.status(403).json({ message: 'Invalid or expired token' });
  }
};

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/user', verifyToken, getCurrentUser);
module.exports = router;
