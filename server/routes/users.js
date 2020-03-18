import express from 'express';
import UserController from '../controllers/users';

const router = express.Router();

/* GET users listing. */
router.get('/fetch', async (req, res, next) => {
  res.json({ success: true });
});

export default router;
