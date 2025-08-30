import db from '../models/index.js';

const { Transaction } = db;

export const createTransaction = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { type, amount, date } = req.body;

    if (!user_id || !type || !amount || !date) {
      return res.status(400).json({ message: 'Missing data required.' });
    }

    if (type !== 'current account' && type !== 'savings account' && type !== 'personal loan' && type !== 'mortgage') {
      return res.status(400).json({ message: 'Invalid transaction type.' });
    }
    
    const newTransaction = await Transaction.create({
      user_id,
      type,
      amount,
      date,
    });

    res
      .status(200)
      .json({
        message: 'Transaction created successfully.',
        transaction: newTransaction,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error creating transaction.', details: error.message });
  }
};
