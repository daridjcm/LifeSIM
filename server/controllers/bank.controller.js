import db from '../models/index.js';

const { BankAccount } = db;

export const createBankAccount = async (req, res) => {
  try {
    const user_id = req.userID;
    const { current_account, savings_account, money_inverted, debt } = req.body;

    if (!user_id) {
      return res.status(400).json({ message: 'Missing data required.' });
    }

    const existingBankAccount = await BankAccount.findOne({
      where: { user_id },
    });

    if (existingBankAccount) {
      return res
        .status(409)
        .json({ message: `Bank account already exists for the User ID: ${user_id}.` });
    }

    const newBankAccount = await BankAccount.create({
      user_id,
      current_account,
      savings_account,
      money_inverted,
      debt,
    });

    res
      .status(200)
      .json({
        message: 'Bank account created successfully.',
        bank: newBankAccount,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error creating bank account.', details: error.message });
  }
};

export const getBankAccounts = async (req, res) => {
  const user_id = req.userID;
  try {
    const bankAccounts = await BankAccount.findAll({ where: { user_id } });
    res.status(200).json({ bankAccounts });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error fetching bank accounts.', details: error.message });
  }
};

export const updateBankAccount = async (req, res) => {
  try {
    const user_id = req.userID;
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

    res
      .status(200)
      .json({
        message: 'Bank account updated successfully.',
        bank: bankAccount,
      });
  } catch (error) {
    res
      .status(500)
      .json({ error: 'Error updating bank account.', details: error.message });
  }
};
