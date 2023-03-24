import express from 'express';
const router = express.Router();
import checkAuth from '../Middleware/checkAuth.js';
import addMusic from '../Controllers/addMusic.js';
import deleteMusic from '../Controllers/deleteMusic.js';
import getListMusic from '../Controllers/getListMusic.js';

router.post('/add-music', checkAuth, addMusic);
router.delete('/delete-music/:id', checkAuth, deleteMusic);
router.get('/get-list-music', checkAuth, getListMusic);

export default router;