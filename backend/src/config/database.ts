import { Pool } from 'pg';
import fs from 'fs';
import path from 'path';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false,
});

// initialize database schema
const initDatabase = async () => {
  const client = await pool.connect();
  try {
    const migrationPath = path.join(__dirname, '../../migrations/001_initial_schema_postgres.sql');
    const migration = fs.readFileSync(migrationPath, 'utf-8');
    await client.query(migration);
    console.log('✓ database initialized');
  } catch (error) {
    console.error('database initialization error:', error);
    throw error;
  } finally {
    client.release();
  }
};

initDatabase();

export default pool;