import express from 'express';
import {
  getCafeteria,
} from '../controllers/cafeteria.controller.js';
const router = express.Router();

// Define routes for get menu
router.get('/cafeteria', getCafeteria);
// router.put('/cafeteria/:id', updateCafeteria); -> To add or update a menu item (not implemented)

export default router;
