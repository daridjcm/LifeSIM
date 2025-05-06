import express from 'express';
import {
  createUser,
  loginUser,
  getCurrentUser,
  updateUser,
} from '../controllers/user.controller.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/signup', createUser);
router.post('/login', loginUser);
router.get('/me', verifyToken, getCurrentUser);
router.put('/user/:id', updateUser);

export default router;
