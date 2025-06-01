import express from 'express';
import dotenv from 'dotenv';
import sequelize from './config/db.js';
import Routes from './routes/index.js';

dotenv.config();
const app = express();

// Middleware to parse JSON
app.use(express.json());

// Mount all routes under /api
app.use('/api', Routes);

// 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something went wrong', error: err.message });
});

// Sync DB and start server
sequelize.sync({ alter: true })
  .then(() => {
    console.log('Database synced successfully');
    app.listen(process.env.PORT || 3000, () => {
      console.log(`Server running on http://localhost:${process.env.PORT || 3000}`);
    });
  })
  .catch((error) => {
    console.error('Unable to sync database:', error);
  });
