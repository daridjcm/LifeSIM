const { Invoice, Grocery } = require('../models');

const createInvoice = async (req, res) => {
  try {
    // Get shopping list
    const groceries = await Grocery.findAll();

    if (groceries.length === 0) {
      return res.status(400).json({ message: 'No items in the grocery list.' });
    }

    // Calculate the total to shopping list
    const totalAmount = groceries.reduce((total, item) => total + parseFloat(item.price), 0).toFixed(2);

    // Create the invoice
    const newInvoice = await Invoice.create({ totalAmount });

    // Asign the products to invoice
    await Promise.all(groceries.map(item => item.setInvoice(newInvoice)));

    console.log('Invoice created:', newInvoice);
    res.status(201).json({ message: 'Invoice created successfully', newInvoice });
  } catch (error) {
    res.status(500).json({ error: 'Error creating invoice', details: error });
  }
};

const getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.findAll({
      include: [{ model: Grocery, as: 'items' }]
    });
    res.status(200).json({ invoices });
  } catch (error) {
    res.status(500).json({ error: 'Error fetching invoices', details: error });
  }
};

module.exports = { createInvoice, getInvoices };
