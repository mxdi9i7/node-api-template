import Users from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const verifyToken = token => jwt.verify(token, jwtSecret);

const handleLogin = async data => {};

const register = async data => {};

const AuthController = {
  handleLogin,
  register,
  verifyToken,
};

export default AuthController;
