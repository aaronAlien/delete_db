import express from 'express';
import dotenv from 'dotenv';
import authRoutes from './routes/authRoutes';
import { cleanupExpiredUsers } from './models/queries';

// load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// manual cors middleware (cleaner than package)
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', process.env.FRONTEND_URL || 'http://localhost:5173');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  
  if (req.method === 'OPTIONS') {
    return res.sendStatus(200);
  }
  
  next();
});

app.use(express.json());

// routes
app.use('/api', authRoutes);

// health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

// automatic cleanup every 30 seconds
setInterval(async () => {
  try {
    const result = await cleanupExpiredUsers();
    if (result.expiredDeleted > 0 || result.abandonedDeleted > 0) {
      console.log(`✓ cleanup: ${result.expiredDeleted} expired, ${result.abandonedDeleted} abandoned`);
    }
  } catch (error) {
    console.error('automatic cleanup error:', error);
  }
}, 30000);

// start server
app.listen(PORT, () => {
  console.log(`✓ server running on port ${PORT}`);
  console.log(`✓ automatic cleanup enabled`);
});