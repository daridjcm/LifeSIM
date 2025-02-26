const { Invoice, Grocery } = require('../models');

const createInvoice = async (req, res) => {
  try {
    const { totalAmount, items, userID, invoiceNumber } = req.body;

    // Validar que todos los datos estén presentes
    if (!totalAmount || !items || !userID || !invoiceNumber) {
      return res.status(400).json({ message: 'Faltan datos requeridos.' });
    }

    // Crear la factura en la base de datos
    const newInvoice = await Invoice.create({
      totalAmount,
      userID,
      invoiceNumber
    });

    // Asignar los productos a la factura
    await Promise.all(items.map(async (item) => {
      const grocery = await Grocery.create({
        name: item.name,
        quantity: item.quantity,
        price: item.price,
        InvoiceId: newInvoice.id,  // Relacionar con la factura
      });
      await grocery.setInvoice(newInvoice); // Relacionar usando Sequelize
    }));

    console.log('Invoice created:', newInvoice);
    res.status(201).json({ message: 'Invoice created successfully', invoice: newInvoice });
  } catch (error) {
    console.error('Error creating invoice:', error);
    res.status(500).json({ error: 'Error creating invoice', details: error.message });
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
