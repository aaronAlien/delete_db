import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';

// load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api', authRoutes);

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// start server
app.listen(PORT, () => {
  console.log(`✓ server running on http://localhost:${PORT}`);
});