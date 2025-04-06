import express from 'express';
import { saveAppointment, getAppointments, updateAppointmentStatus } from "../controllers/appointment.controller.js"
const router = express.Router();

// Define routes for medicals appointments
router.post('/appointments', saveAppointment);
router.get('/appointments', getAppointments);
router.put('/appointments/:id', updateAppointmentStatus);

export default router;