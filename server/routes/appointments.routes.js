import express from 'express';
import { saveAppointment, getAppointments } from "../controllers/appointment.controller.js"
const router = express.Router();

// Define routes for medicals appointments
router.post('/appointments', saveAppointment);
router.get('/appointments', getAppointments);

export default router;