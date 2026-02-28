import { Request, Response } from 'express';
import { User, createUser, findUserByToken, confirmUser, deleteUser, getCounters, emailExists, isUserExpired } from '../models/queries';
import pool from '../config/database';

// signup
export const signup = async (req: Request, res: Response): Promise<void> => {
  try {
    const { name, email } = req.body;

    console.log('signup request:', { name, email });

    // validate name first
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      res.status(400).json({ error: 'name required' });
      return;
    }

    // validate email second
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      res.status(400).json({ error: 'valid email required' });
      return;
    }

    // check if email already exists
    if (await emailExists(email)) {
      res.status(409).json({ error: 'email already registered' });
      return;
    }

    // create user
    const result = await createUser(name.trim(), email);

    res.status(201).json({ 
      message: 'user created',
      token: result.token
    });
  } catch (error) {
    console.error('signup error:', error);
    res.status(500).json({ error: 'signup failed' });
  }
};

// confirm email
export const confirm = async (req: Request, res: Response): Promise<void> => {
  try {
    const tokenParam = req.params.token;
    const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;

    if (!token) {
      res.status(400).json({ error: 'token required' });
      return;
    }

    const user = await findUserByToken(token);

    if (!user) {
      res.status(404).json({ error: 'invalid token' });
      return;
    }

    if (user.status === 'confirmed') {
      res.status(400).json({ error: 'already confirmed' });
      return;
    }

    // confirm user and set expiry
    await confirmUser(token);

    // get updated user to return expiry time
    const updatedUser = await findUserByToken(token);

    res.status(200).json({ 
      message: 'email confirmed',
      token,
      name: updatedUser?.name,
      expiresAt: updatedUser?.expires_at
    });
  } catch (error) {
    console.error('confirm error:', error);
    res.status(500).json({ error: 'confirmation failed' });
  }
};

// check session status
export const checkSession = async (req: Request, res: Response): Promise<void> => {
  try {
    const tokenParam = req.params.token;
    const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;

    if (!token) {
      res.status(400).json({ error: 'token required' });
      return;
    }

    const user = await findUserByToken(token);

    if (!user) {
      res.status(404).json({ error: 'user not found', expired: true });
      return;
    }

    const expired = await isUserExpired(token);

    if (expired) {
      // auto-delete expired user
      await deleteUser(token);
      res.status(200).json({ expired: true });
      return;
    }

    res.status(200).json({ 
      expired: false,
      expiresAt: user.expires_at
    });
  } catch (error) {
    console.error('check session error:', error);
    res.status(500).json({ error: 'failed to check session' });
  }
};

// logout (delete user)
export const logout = async (req: Request, res: Response): Promise<void> => {
  try {
    const tokenBody = req.body.token;
    const token = Array.isArray(tokenBody) ? tokenBody[0] : tokenBody;

    if (!token) {
      res.status(400).json({ error: 'token required' });
      return;
    }

    const user = await findUserByToken(token);

    if (!user) {
      res.status(404).json({ error: 'user not found' });
      return;
    }

    // delete user and increment counter
    await deleteUser(token);

    res.status(200).json({ message: 'user deleted' });
  } catch (error) {
    console.error('logout error:', error);
    res.status(500).json({ error: 'logout failed' });
  }
};

// get counters
export const counters = async (req: Request, res: Response): Promise<void> => {
  try {
    const data = await getCounters();
    res.status(200).json(data);
  } catch (error) {
    console.error('counters error:', error);
    res.status(500).json({ error: 'failed to fetch counters' });
  }
};

// admin: get all users (for debugging)
export const adminGetUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const query = 'SELECT id, name, status, created_at, confirmed_at, expires_at FROM users';
    const result = await pool.query(query);
    
    res.status(200).json({ users: result.rows });
  } catch (error) {
    console.error('admin get users error:', error);
    res.status(500).json({ error: 'failed to fetch users' });
  }
};