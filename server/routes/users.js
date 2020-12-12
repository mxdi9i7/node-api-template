import express from 'express';
import UserController from '../controllers/users';
import UploadController from '../controllers/upload';
import getFileObject from '../helpers/fileObject';
require('dotenv').config();
const bucketName = process.env.AWS_BUCKET;
const router = express.Router();
let multer = require('multer');
const SIZE_LIMIT = 5242880;
const SIZE_TRANSIT = 1024;
const errorMessage = 'File is too big';

/* GET users listing. */
router.get('/fetch', async (req, res, next) => {
  res.json({ success: true });
});
// change user avatar
router.post('/avatar',UploadController.avatar.single('data'), async (req, res, error) => {
		try{
			const size = req.headers['content-length'];
			const fileObject = getFileObject(req.file);
			if (size < SIZE_LIMIT) {
				const url = `https://${bucketName}.s3.amazonaws.com/${req.file.key}`;
				const user = await UserController.changeAvatar(req.body,url);
				res.json({
					data: {
						url: url,
						size: size / SIZE_TRANSIT + 'kb',
						name: fileObject.name,
						type: fileObject.type,
						extension: fileObject.extension,
					},
					success: true,
				});
			} else if (error instanceof multer.MulterError) {
				res.json({
					data: error,
					success: false,
				});
			} else {
				res.json({
					data: {
						errorMessage,
						size: size / SIZE_TRANSIT + 'kb',
					},
					success: false,
				});
			}
		}
		catch (e) {
			return res.json({
				success: false,
				data: e,
			});
		}
		
	},
);


export default router;
