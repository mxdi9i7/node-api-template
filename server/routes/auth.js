import express from 'express';
import AuthController from '../controllers/auth';
const router = express.Router();

router.post('/register', async (req, res) => {
  try {
    const data = await AuthController.register(req.body);
    return res.json({
      success: true,
      data: data,
    });
  } catch (e) {
    return res.json({
      success: false,
      data: e,
    });
  }
});

router.post('/login', async (req, res) => {
	try {
		const data = await AuthController.handleLogin(req.body);

		return res.json({
			success: true,
			data: data,
		});
	} catch (e) {
		return res.json({
			success: false,
			data: e,
		});
	}
});

router.post('/forgot', async (req, res) => {
	try {
		const data = await AuthController.forgotPassword(req.body);

		return res.json({
			success: true,
			data: data,
		});
	} catch (error) {
		return res.json({
			success: false,
			data: error,
		});
	}
});

router.put('/password', async (req, res) => {
	try {
		const result = await AuthController.changePassword(req.body);

		return res.json({
			success: true,
			data: result,
		});
	} catch (e) {
		return res.json({
			success: false,
			data: e,
		});
	}
});

export default router;
