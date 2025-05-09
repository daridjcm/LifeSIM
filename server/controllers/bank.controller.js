import db from '../models/index.js';

const { BankAccount, Transaction } = db;

// #region BANK
export const createBankAccount = async (req, res) => {
  try {
    const { user_id, current_account, savings_account, money_inverted, debt } = req.body;

    if (!user_id || !current_account || !savings_account || !money_inverted || !debt) {
      return res.status(400).json({ message: 'Missing data required.' });
    }

    const newBankAccount = await BankAccount.create({
      user_id,
      current_account,
      savings_account,
      money_inverted,
      debt,
    });

    console.log('Bank account created:', newBankAccount);
    res
      .status(201)
      .json({ message: 'Bank account created successfully', bank: newBankAccount });
  } catch (error) {
    console.error('Error creating bank account:', error);
    res
      .status(500)
      .json({ error: 'Error creating bank account', details: error.message });
  }
};

export const getBankAccounts = async (req, res) => {
  try {
    const bankAccounts = await BankAccount.findAll();
    res.status(200).json({ bankAccounts });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching bank accounts', details: error.message });
  }
};

export const updateBankAccount = async (req, res) => {
  try {
    const { user_id } = req.params;
    const { current_account, savings_account, money_inverted, debt } = req.body;

    if (!current_account || !savings_account || !money_inverted || !debt) {
      return res.status(400).json({ message: 'Missing data required.' });
    }

    const bankAccount = await BankAccount.findByPk(user_id);

    if (!bankAccount) {
      return res.status(404).json({ message: 'Bank account not found.' });
    }

    bankAccount.current_account = current_account;
    bankAccount.savings_account = savings_account;
    bankAccount.money_inverted = money_inverted;
    bankAccount.debt = debt;
    await bankAccount.save();
  
    console.log('Bank account updated:', bankAccount);
    res
      .status(200)
      .json({ message: 'Bank account updated successfully', bank: bankAccount });
  } catch (error) {
    console.error('Error updating bank account:', error);
    res
      .status(500)
      .json({ error: 'Error updating bank account', details: error.message });
  }
};

// #region CARDS

// #region TRANSACTIONS
export const createTransaction = async (req, res) => {
  try {
    const { user_id, type, amount, date } = req.body;

    if (!user_id || !type || !amount || !date) {
      return res.status(400).json({ message: 'Missing data required.' });
    }

    const newTransaction = await Transaction.create({
      user_id,
      type,
      amount,
      date,
    });

    console.log('Transaction created:', newTransaction);
    res
      .status(201)
      .json({ message: 'Transaction created successfully', transaction: newTransaction });
  } catch (error) {
    console.error('Error creating transaction:', error);
    res
      .status(500)
      .json({ error: 'Error creating transaction', details: error.message });
  }
};