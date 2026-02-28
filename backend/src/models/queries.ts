import pool from '../config/database';
import crypto from 'crypto';

// user interface
export interface User {
  id: string;
  name: string;
  email_hash: string;
  status: 'pending' | 'confirmed';
  created_at: string;
  confirmed_at: string | null;
  expires_at: string | null;
  token: string;
}

// helper: hash email
export const hashEmail = (email: string): string => {
  return crypto.createHash('sha256').update(email.toLowerCase()).digest('hex');
};

// helper: generate token
export const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// create user
export const createUser = async (name: string, email: string) => {
  const id = crypto.randomUUID();
  const emailHash = hashEmail(email);
  const token = generateToken();
  const createdAt = new Date().toISOString();

  const query = `
    INSERT INTO users (id, name, email_hash, status, created_at, token)
    VALUES ($1, $2, $3, 'pending', $4, $5)
    RETURNING id, token
  `;

  const result = await pool.query(query, [id, name, emailHash, createdAt, token]);
  return result.rows[0];
};

// find user by token
export const findUserByToken = async (token: string): Promise<User | undefined> => {
  const query = 'SELECT * FROM users WHERE token = $1';
  const result = await pool.query(query, [token]);
  return result.rows[0];
};

// confirm user (set expiry time: 5 minutes from now)
export const confirmUser = async (token: string) => {
  const confirmedAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString();

  const query = `
    UPDATE users 
    SET status = 'confirmed', confirmed_at = $1, expires_at = $2
    WHERE token = $3
  `;

  await pool.query(query, [confirmedAt, expiresAt, token]);
};

// delete user (increment counter here)
export const deleteUser = async (token: string) => {
  const client = await pool.connect();
  
  try {
    await client.query('BEGIN');

    // delete user
    await client.query('DELETE FROM users WHERE token = $1', [token]);

    // increment completed cycles counter
    await client.query(`
      UPDATE counters 
      SET count = count + 1, updated_at = NOW()
      WHERE metric = 'completed_cycles'
    `);

    await client.query('COMMIT');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

// get counters
export const getCounters = async () => {
  const query = 'SELECT metric, count FROM counters';
  const result = await pool.query(query);
  
  return {
    completedCycles: result.rows.find(r => r.metric === 'completed_cycles')?.count || 0,
  };
};

// check if email exists
export const emailExists = async (email: string): Promise<boolean> => {
  const emailHash = hashEmail(email);
  const query = 'SELECT id FROM users WHERE email_hash = $1';
  const result = await pool.query(query, [emailHash]);
  return result.rows.length > 0;
};

// check if user session expired
export const isUserExpired = async (token: string): Promise<boolean> => {
  const user = await findUserByToken(token);
  if (!user || !user.expires_at) return false;
  
  return new Date(user.expires_at) < new Date();
};

// cleanup expired and abandoned users
export const cleanupExpiredUsers = async () => {
  const client = await pool.connect();
  const now = new Date().toISOString();
  const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000).toISOString();

  try {
    await client.query('BEGIN');

    // delete confirmed users past their expiry time
    const expiredResult = await client.query(`
      DELETE FROM users 
      WHERE status = 'confirmed' 
      AND expires_at IS NOT NULL 
      AND expires_at < $1
    `, [now]);

    // delete pending users older than 10 minutes (never confirmed)
    const abandonedResult = await client.query(`
      DELETE FROM users 
      WHERE status = 'pending' 
      AND created_at < $1
    `, [tenMinutesAgo]);

    // increment counter for each expired session (not for abandoned signups)
    if (expiredResult.rowCount && expiredResult.rowCount > 0) {
      await client.query(`
        UPDATE counters 
        SET count = count + $1, updated_at = NOW()
        WHERE metric = 'completed_cycles'
      `, [expiredResult.rowCount]);
    }

    await client.query('COMMIT');

    return {
      expiredDeleted: expiredResult.rowCount || 0,
      abandonedDeleted: abandonedResult.rowCount || 0,
    };
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};