import express from 'express';
import { createWork, updateWork, getCurrentWork, deleteWork } from '../controllers/work.controller.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.post('/work', verifyToken, createWork);
router.get('/work', verifyToken, getCurrentWork);
router.put('/work/:id', updateWork);
router.delete('/work/:id', verifyToken, deleteWork);

export default router;
