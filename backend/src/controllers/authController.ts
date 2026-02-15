import { Request, Response } from 'express';
import { User, createUser, findUserByToken, confirmUser, deleteUser, getCounters, emailExists, isUserExpired } from '../models/queries';

// signup
export const signup = (req: Request, res: Response): void => {
  try {
    const { name, email } = req.body;

    console.log('signup request:', { name, email });

    // validate name first
    if (!name || typeof name !== 'string' || name.trim().length === 0) {
      console.log('validation failed: name required');
      res.status(400).json({ error: 'name required' });
      return;
    }

    // validate email second
    if (!email || typeof email !== 'string' || !email.includes('@')) {
      console.log('validation failed: valid email required');
      res.status(400).json({ error: 'valid email required' });
      return;
    }

    // check if email already exists
    if (emailExists(email)) {
      console.log('validation failed: email already registered');
      res.status(409).json({ error: 'email already registered' });
      return;
    }

    // create user
    console.log('about to create user...');
    const { token } = createUser(name.trim(), email);
    console.log('user created successfully, token:', token);

    res.status(201).json({ 
      message: 'user created',
      token 
    });
  } catch (error) {
    console.error('signup error:', error);
    res.status(500).json({ error: 'signup failed' });
  }
};

// confirm email
export const confirm = (req: Request, res: Response): void => {
  try {
    const tokenParam = req.params.token;
    
    // ensure token is string, not array
    const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;

    if (!token) {
      res.status(400).json({ error: 'token required' });
      return;
    }

    const user = findUserByToken(token);

    if (!user) {
      res.status(404).json({ error: 'invalid token' });
      return;
    }

    if (user.status === 'confirmed') {
      res.status(400).json({ error: 'already confirmed' });
      return;
    }

    // confirm user - increment counter - set expiry
    confirmUser(token);

    // get updated user - return expiry time
    const updatedUser = findUserByToken(token);

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
export const checkSession = (req: Request, res: Response): void => {
  try {
    const tokenParam = req.params.token;
    const token = Array.isArray(tokenParam) ? tokenParam[0] : tokenParam;

    if (!token) {
      res.status(400).json({ error: 'token required' });
      return;
    }

    const user = findUserByToken(token);

    if (!user) {
      res.status(404).json({ error: 'user not found', expired: true });
      return;
    }

    const expired = isUserExpired(token);

    if (expired) {
      // auto-delete expired user
      deleteUser(token);
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
export const logout = (req: Request, res: Response): void => {
  try {
    const tokenBody = req.body.token;
    
    // ensure token is string, not array
    const token = Array.isArray(tokenBody) ? tokenBody[0] : tokenBody;

    if (!token) {
      res.status(400).json({ error: 'token required' });
      return;
    }

    const user = findUserByToken(token);

    if (!user) {
      res.status(404).json({ error: 'user not found' });
      return;
    }

    // delete user and increment counter
    deleteUser(token);

    res.status(200).json({ message: 'user deleted' });
  } catch (error) {
    console.error('logout error:', error);
    res.status(500).json({ error: 'logout failed' });
  }
};

// get counters
export const counters = (req: Request, res: Response): void => {
  try {
    const data = getCounters();
    res.status(200).json(data);
  } catch (error) {
    console.error('counters error:', error);
    res.status(500).json({ error: 'failed to fetch counters' });
  }
};