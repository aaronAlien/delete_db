import db from '../config/database';
import crypto from 'crypto';

// user interface - esported
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

// helper - hash email
export const hashEmail = (email: string): string => {
  return crypto.createHash('sha256').update(email.toLowerCase()).digest('hex');
};

// helper - generate token
export const generateToken = (): string => {
  return crypto.randomBytes(32).toString('hex');
};

// create user
export const createUser = (name: string, email: string) => {
  const id = crypto.randomUUID();
  const emailHash = hashEmail(email);
  const token = generateToken();
  const createdAt = new Date().toISOString();

  console.log('creating user:', { id, name, emailHash, token, createdAt }); // debug

  const stmt = db.prepare(`
    INSERT INTO users (id, name, email_hash, status, created_at, confirmed_at, expires_at, token)
    VALUES (?, ?, ?, 'pending', ?, NULL, NULL, ?)
  `);

  stmt.run(id, name, emailHash, createdAt, token);

  return { id, token };
};

// find user by token
export const findUserByToken = (token: string): User | undefined => {
  const stmt = db.prepare('SELECT * FROM users WHERE token = ?');
  return stmt.get(token) as User | undefined;
};

// confirm user - no counter increment -  set expiry time
export const confirmUser = (token: string) => {
  const confirmedAt = new Date().toISOString();
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000).toISOString(); // 5min

  const updateUser = db.prepare(`
    UPDATE users 
    SET status = 'confirmed', confirmed_at = ?, expires_at = ?
    WHERE token = ?
  `);
  updateUser.run(confirmedAt, expiresAt, token);
};

// delete user - increment counter here
export const deleteUser = (token: string) => {
  // use transaction to delete user and increment counter
  const transaction = db.transaction(() => {
    // delete user
    const deleteStmt = db.prepare('DELETE FROM users WHERE token = ?');
    deleteStmt.run(token);

    // increment completed cycles counter
    const updateCounter = db.prepare(`
      UPDATE counters 
      SET count = count + 1, updated_at = datetime('now')
      WHERE metric = 'completed_cycles'
    `);
    updateCounter.run();
  });

  transaction();
};

// get counters
export const getCounters = () => {
  const stmt = db.prepare('SELECT metric, count FROM counters');
  const rows = stmt.all() as Array<{ metric: string; count: number }>;
  
  return {
    completedCycles: rows.find(r => r.metric === 'completed_cycles')?.count || 0,
  };
};

// check if email exists
export const emailExists = (email: string): boolean => {
  const emailHash = hashEmail(email);
  const stmt = db.prepare('SELECT id FROM users WHERE email_hash = ?');
  const result = stmt.get(emailHash);
  return !!result;
};

// user session expired?
export const isUserExpired = (token: string) : boolean => {
  const user = findUserByToken(token);
  if (!user || !user.expires_at) return false;

  return new Date(user.expires_at) < new Date();
}