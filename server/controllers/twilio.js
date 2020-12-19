import twilio from 'twilio';
require('dotenv').config();

const accountSid = process.env.ACCOUT_SID;
const authToken = process.env.AUTH_TOKEN;
const friendlyName = process.env.TWILIO_NAME;
const phoneLength = 10;
const USAreaCode = '+1';

let client;

try {
  client = twilio(accountSid, authToken);
} catch (error) {
  console.log('Twilio environment variable not set');
}

const getSMSCode = async (req, res) => {
  const { phone } = req.body;

  const service = await client.verify.services.create({
    friendlyName,
  });
  const { sid } = service;

  try {
    let formattedPhone;

    if (phone.length === phoneLength) {
      formattedPhone = USAreaCode + phone;
    } else {
      throw 'Invalid phone number, please try again';
    }

    client.verify.services(sid).verifications.create({
      to: formattedPhone,
      channel: 'sms',
    });
  } catch (error) {
    res.json({
      data: error,
      success: false,
    });
  }
  res.json({
    data: sid,
    success: true,
  });
};

const verifyCode = async (req, res) => {
  const { phone, code, sid } = req.body;

  let formattedPhone;

  if (phone.length === phoneLength) {
    formattedPhone = USAreaCode + phone;
  }
  try {
    if (sid) {
      const result = await client.verify
        .services(sid)
        .verificationChecks.create({
          to: formattedPhone,
          code,
        });

      if (result.status === 'approved') {
        return res.json({
          success: true,
          data: result.status,
        });
      }
    } else {
      throw 'Code does not match, Please try again';
    }
  } catch (error) {
    console.log(error);
    res.json({ success: false, data: error });
  }
  return null;
};

const twilioController = {
  getSMSCode,
  verifyCode,
};

export default twilioController;
