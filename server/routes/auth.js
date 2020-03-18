import express from "express";
import AuthController from "../controllers/auth";
const router = express.Router();

router.post("/verify/token", async (req, res) => {
  const { token } = req.body;
  try {
    const result = await AuthController.verifyToken(token);
    res.json({
      data: result,
      success: true
    });
  } catch (error) {
    res.json({
      data: error.message,
      success: false
    });
  }
});

router.post("/login", async (req, res) => {
  const { phone, password } = req.body;
  if (phone && password) {
    const result = await AuthController.handleLogin(req.body);

    res.json(result);
  } else {
    res.json({
      data: "You need both phone and password to login!",
      success: false
    });
  }
});

router.post("/register", async (req, res) => {
  const {
    email,
    password,
    firstName,
    lastName,
    age,
    gender,
    street,
    city,
    state,
    zip,
    phone
  } = req.body;
  if (
    email &&
    password &&
    firstName &&
    lastName &&
    age &&
    gender &&
    street &&
    city &&
    state &&
    zip &&
    phone
  ) {
    const result = await AuthController.register(req.body);
    res.json(result);
  } else {
    res.json({
      data: "You are missing some data to create user!",
      success: false
    });
  }
});

router.post("/sms/getCode", async (req, res) => {});

router.post("/sms/verifyCode", async (req, res) => {});

export default router;
