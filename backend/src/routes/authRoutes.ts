import { Router } from 'express';
import { signup, confirm, logout, counters, checkSession } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);
router.get('/confirm/:token', confirm);
router.get('/session/:token', checkSession);
router.post('/logout', logout);
router.get('/counters', counters);

export default router;