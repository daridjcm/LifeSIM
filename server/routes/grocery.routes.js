import express from 'express'
import { saveGrocery, getGroceries } from '../controllers/grocery.controller.js';
const router = express.Router();

// Save grocery items
router.post('/grocery', saveGrocery);

// Get all groceries
router.get('/grocery', getGroceries);

export default router;