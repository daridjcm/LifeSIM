import express from 'express';
const router = express.Router();
import { verifyToken } from '../middlewares/authMiddleware.js';
import {
  createInvoice,
  getInvoices,
} from '../controllers/invoice.controller.js';

router.post('/invoices', verifyToken, createInvoice);
router.get('/invoices', getInvoices);

export default router;
