import express from 'express';
import twilioController from '../controllers/twilio';
const router = express.Router();

// request a SMS code
router.post('/code', async (req, res) => {
	try {
		const data = await twilioController.getSMSCode(req, res);
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
// verify SMS code
router.post('/verify', async (req, res) => {
	try {
		const data = await twilioController.verifyCode(req, res);

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

export default router;