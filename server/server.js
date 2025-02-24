require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { connectDB } = require('./config/database');
const userRoutes = require('./routes/user.routes');
const groceryRoutes = require('./routes/grocery.routes');
const invoiceRoutes = require('./routes/invoices.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MySQL
connectDB();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', userRoutes);
app.use('/api', groceryRoutes);
app.use('/api', invoiceRoutes);

app.get('/', (req, res) => res.send('API is running...'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
