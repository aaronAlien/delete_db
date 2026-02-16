import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { cleanupExpiredUsers } from './models/queries';

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

// auto cleanup
setInterval(() => {
  try {
    const result = cleanupExpiredUsers();
    if (result.expiredDeleted > 0 || result.abandonedDeleted > 0) {
      console.log(`cleanup: ${result.expiredDeleted} expired, ${result.abandonedDeleted} abandoned`);
    }
    } catch (error) {
      console.error('cleanup error:', error);
      }
}, 30000); // 30s

// start server
app.listen(PORT, () => {
  console.log(`✓ server running on http://localhost:${PORT}`);
});