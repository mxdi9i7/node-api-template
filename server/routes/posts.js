import express from 'express';
import PostController from '../controllers/posts';

const router = express.Router();

/* GET users listing. */
router.get('/fetch', async (req, res, next) => {
  res.json({ success: true });
});

export default router;
