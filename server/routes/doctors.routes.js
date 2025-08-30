import express from 'express';
import {
  getDoctors, 
} from '../controllers/doctors.controller.js';
const router = express.Router();

// Define routes for get menu
router.get('/doctors', getDoctors);
// router.put('/cafeteria/:id', updateDoctor); -> To add or update a doctor (not implemented)

export default router;
