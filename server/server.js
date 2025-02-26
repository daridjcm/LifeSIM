require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const { sequelize } = require('./models');
const userRoutes = require('./routes/user.routes');
const invoiceRoutes = require('./routes/invoices.routes');
const groceryRoutes = require('./routes/grocery.routes')

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MySQL
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api', userRoutes);
app.use('/api', groceryRoutes);
app.use('/api', invoiceRoutes);


// app.get('/api/user', verifyToken, (req, res) => {
//   res.json({ message: 'Protected profile route', user: req.user });
// });


app.get('/', (req, res) => res.send('API is running...'));

sequelize.sync({ alter: true })
  .then(() => {
    console.log('Tables synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing tables:', error);
  });

app.listen(PORT, async () => console.log(`Server running on http://localhost:${PORT}`));
