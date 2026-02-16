import { Router } from 'express';
import { signup, confirm, logout, counters, checkSession, adminGetUsers } from '../controllers/authController';

const router = Router();

router.post('/signup', signup);
router.get('/confirm/:token', confirm);
router.get('/session/:token', checkSession);
router.post('/logout', logout);
router.get('/counters', counters);
router.get('/admin/users', adminGetUsers);

export default router;