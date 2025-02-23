const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');

const Grocery = sequelize.define('Grocery', {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false }
}, {
  timestamps: true,
  tableName: 'grocery'
});

module.exports = Grocery;
