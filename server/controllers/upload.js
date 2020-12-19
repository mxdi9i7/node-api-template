import multer from 'multer';
import multerS3 from 'multer-s3';
import aws from 'aws-sdk';
require('dotenv').config();
import Randomize from '../constants/randomize';
const accessKeyId = process.env.AWS_ACCESS_KEY_ID;
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY;
const bucket = process.env.AWS_BUCKET;
const region = process.env.AWS_REGION;
import getFileObject from '../helpers/fileObject';

let s3, s3AvatarStorage;

try {
  s3 = new aws.S3({
    accessKeyId,
    secretAccessKey,
    region,
  });
  s3AvatarStorage = multerS3({
    s3: s3,
    bucket: bucket,
    key: (req, file, cb) => {
      const extension = getFileObject(file).extension;
      const nameRule =
        Date.now() + Math.round(Math.random() * Randomize.MILLISECONDS);

      cb(null, `avatar-${nameRule}.${extension}`);
    },
  });
} catch (e) {
  console.log('Bucket environment is not set');
}

const avatar = multer({ storage: s3AvatarStorage });

const UploadController = {
  avatar,
};

export default UploadController;
