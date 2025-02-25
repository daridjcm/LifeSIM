const { User } = require('../models');

const createUser = async (req, res) => {
  try {
    const { username, email, password, gender } = req.body;
    const newUser = await User.create({ username, email, password, gender });
    res.status(201).json({ message: 'User created', newUser });
  } catch (error) {
    res.status(400).json({ error: 'Error creating user', details: error });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).json({ users });
  } catch (error) {
    res.status(400).json({ error: 'Error fetching users', details: error });
  }
};

module.exports = { createUser, getUsers };
