require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const { connectDB } = require('./config/database');
const userRoutes = require('./routes/user.routes');
const invoiceRoutes = require('./routes/invoices.routes');

const app = express();
const PORT = process.env.PORT || 3000;

// Connect to MySQL
connectDB();

// Middlewares
app.use(express.json());
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use('/api', userRoutes);
app.use('/api', invoiceRoutes);


// app.get('/api/user', verifyToken, (req, res) => {
//   res.json({ message: 'Protected profile route', user: req.user });
// });


app.get('/', (req, res) => res.send('API is running...'));

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
