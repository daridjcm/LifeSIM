const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const Grocery = require('./grocery');

const Invoice = sequelize.define('Invoice', {
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
  tableName: 'invoices'
});


// Relation: An invoice it can have many products
Invoice.hasMany(Grocery, { as: 'items' });
Grocery.belongsTo(Invoice);

module.exports = Invoice;
