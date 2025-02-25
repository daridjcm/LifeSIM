const { sequelize } = require('../config/database');
const User = require('./user');
const Invoice = require('./invoice');

// Sync models with database
sequelize.sync({ alter: true })
  .then(() => console.log('All models were synchronized successfully.'))
  .catch(error => console.error('Sync Error:', error));

module.exports = { sequelize, User, Invoice };
