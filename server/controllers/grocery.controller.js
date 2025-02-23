const { Grocery } = require('../models');

const getGroceries = async (req, res) => {
  try {
    const groceries = await Grocery.findAll();
    res.status(200).json({ groceries });
  } catch (error) {
    res.status(400).json({ error: 'Error fetching groceries', details: error });
  }
};

const addGrocery = async (req, res) => {
  try {
    const { name, price } = req.body;
    const newGrocery = await Grocery.create({ name, price });
    res.status(201).json({ message: 'Grocery added', newGrocery });
  } catch (error) {
    res.status(400).json({ error: 'Error adding grocery', details: error });
  }
};

module.exports = { getGroceries, addGrocery };
