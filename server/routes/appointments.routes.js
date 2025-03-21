import express from 'express';
import { saveAppointment, getAppointments } from "../controllers/appointments.controller.js"
const router = express.Router();

// Define routes for medicals appointments
router.post('/api/appointments', saveAppointment);
router.get('/api/appointments', getAppointments);

export default router;