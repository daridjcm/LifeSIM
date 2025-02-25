const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Invoices = sequelize.define('Invoices', {
  invoiceNumber: {
    type: DataTypes.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true
  },
  totalAmount: {
    type: DataTypes.FLOAT,
    allowNull: false
  }
}, {
  timestamps: true,
  tableName: 'Invoices'
});

module.exports = Invoices;
