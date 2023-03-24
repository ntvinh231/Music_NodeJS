import express from 'express';
const router = express.Router();
import checkAuth from '../Middleware/checkAuth.js';
import register from '../Controllers/Signup.js';
import login from '../Controllers/Signin.js';
import getCurrentUser from '../Controllers/getCurrentUser.js';

router.post('/signup', register);
router.post('/signin', login);
router.get('/get-current-user', checkAuth, getCurrentUser);

export default router;