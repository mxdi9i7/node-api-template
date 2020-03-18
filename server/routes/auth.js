import express from 'express';
import AuthController from '../controllers/auth';
const router = express.Router();

router.get('/', async (req, res) => {
  res.sendStatus(200);
});

export default router;
