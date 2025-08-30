import db from '../models/index.js';
const { Invoice } = db;

// add handle payment and check if the user has enough money
export const createInvoice = async (req, res) => {
  try {
    const user_id = req.user_id;
    const { items, total_amount, payment_method } = req.body;

    const invoiceCount = await Invoice.count({ where: { user_id } });
    const invoice_number = invoiceCount + 1;

    if (
      !user_id ||
      !invoice_number ||
      !items ||
      !total_amount ||
      !payment_method
    ) {
      return res.status(400).json({ message: 'Missing data required.' });
    }

    const newInvoice = await Invoice.create({
      user_id,
      invoice_number,
      items,
      total_amount: parseFloat(total_amount),
      payment_method,
    });

    console.log('Invoice created:', newInvoice);
    res
      .status(200)
      .json({ message: 'Invoice created successfully', invoice: newInvoice });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res
      .status(500)
      .json({ error: 'Error creating invoice', details: error.message });
  }
};

export const getInvoices = async (req, res) => {
  const { user_id } = req.user_id;
  try {
    const invoices = await Invoice.findAll({ where: { user_id } });
    res.status(200).json({ invoices });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching invoices', details: error });
  }
};
