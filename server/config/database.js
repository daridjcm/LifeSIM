// config/database.js
const { Sequelize } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: 'mariadb',
    port: process.env.DB_PORT,
  }
);

const connectDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('MariaDB connected');
  } catch (error) {
    console.error('MariaDB connection error:', error);
    process.exit(1);
  }
};

module.exports = { sequelize, connectDB, JWT_SECRET: process.env.JWT_SECRET || 'your_jwt_secret' };
