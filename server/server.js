import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import { connectDB } from './config/database.js';
import { sequelize } from './models/index.js';
import userRoutes from './routes/user.routes.js';
import invoiceRoutes from './routes/invoices.routes.js';
import groceryRoutes from './routes/grocery.routes.js';
import appointmentsRoutes from './routes/appointments.routes.js';
import bankRoutes from './routes/bank.routes.js';
import workRoutes from './routes/work.routes.js';
import cafeteriaRoutes from './routes/cafeteria.routes.js';

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
app.use('/api', appointmentsRoutes);
app.use('/api', bankRoutes);
app.use('/api', workRoutes)
app.use('/api', cafeteriaRoutes);

app.get('/robots.txt', (req, res) => {
  res.sendFile(path.join(__dirname, 'robots.txt'));
});

app.get('/', (req, res) => res.send('API is running...'));

sequelize
  .sync({ force: false, alter: true })
  .then(() => {
    console.log('Tables synchronized');
  })
  .catch((error) => {
    console.error('Error synchronizing tables:', error);
  });

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`),
);
