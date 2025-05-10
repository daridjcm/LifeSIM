import express from 'express';
import {
  createBankAccount,
  getBankAccounts,
  updateBankAccount,
} from '../controllers/bank.controller.js';
import { verifyToken } from '../middlewares/authMiddleware.js';
const router = express.Router();

router.get('/bank', verifyToken, getBankAccounts);
router.post('/bank/', verifyToken, createBankAccount);
router.put('/bank/:id', updateBankAccount);

// router.get('/bank/transactions');

export default router;
