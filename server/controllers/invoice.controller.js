import db from '../models/index.js';
const { Invoice } = db;

export const createInvoice = async (req, res) => {
  try {
    const { totalAmount, items } = req.body;
    
    const userID = req.userID;
    const invoiceCount = await Invoice.count({ where: { userID } });
    const invoiceNumber = invoiceCount + 1;
    
    if (!totalAmount || !items || !userID || !invoiceNumber) {
      return res.status(400).json({ message: 'Missing data required.' });
    }

    const newInvoice = await Invoice.create({
      totalAmount: parseFloat(totalAmount),
      userID,
      items: JSON.stringify(items),
      invoiceNumber
    });

    console.log('Invoice created:', newInvoice);
    res.status(201).json({ message: 'Invoice created successfully', invoice: newInvoice });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Error creating invoice', details: error.message });
  }
};


export const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll();
    res.status(200).json({ invoices });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching invoices', details: error });
  }
};
