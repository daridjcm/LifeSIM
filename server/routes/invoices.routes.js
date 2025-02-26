import express from 'express';
const router = express.Router();
import { createInvoice, getInvoices } from '../controllers/invoice.controller.js';

router.post('/invoices', createInvoice);
router.get('/invoices', getInvoices);

export default router;
