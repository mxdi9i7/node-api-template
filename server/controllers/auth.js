import Users from '../models/User';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import checkMissingFields from '../helpers/checkMissingFields';
require('dotenv').config();

const jwtSecret = process.env.JWT_SECRET;

const verifyToken = token => jwt.verify(token, jwtSecret);

const handleLogin = async data => {
	const { phone, password } = data;

	if (!phone) {
		throw 'Missing phone number';
	}
	if (!password) {
		throw 'Missing password';
	}

	const user = await Users.findOne({
		phone,
	});

	if (!user) {
		throw 'Phone is not found';
	}

	const isPasswordMatch = bcrypt.compareSync(password, user.password);

	if (!isPasswordMatch) {
		throw 'Password is not correct';
	}
	return jwt.sign(
		{
			userId: String(user._id),
		},
		jwtSecret,
	);
};

const register = async data => {
	const { phone, password, } = data;

	if (!phone) {
		throw 'missing phone number';
	}

	if (!password) {
		throw 'missing password';
	}

	const hashedPassword = bcrypt.hashSync(password);

	return Users.create({
		phone,
		password: hashedPassword,
	});
};

const forgotPassword = async (data) => {
	const { phone, newPassword } = data;
	const encryptedPassword = bcrypt.hashSync(newPassword);
	const user = await Users.findOne({ phone });
	if(user){
		await Users.findOneAndUpdate(
			{ phone },
			{ $set: { password: encryptedPassword } },
			{ new: true },
		);
	}
	else{
		throw 'User not found.';
	}
};

const changePassword = async (data) => {
	const { oldPassword, newPassword, phone } = data;
	const hashedNewPassword = bcrypt.hashSync(newPassword);
	const user = await Users.findOne({ phone });
	const password = user.password;
	const requiredData = {
		oldPassword,
		newPassword,
		phone,
	};
	if (!user) {
		throw 'user not found!';
	} else {
		checkMissingFields(requiredData);
	}
	if (!bcrypt.compareSync(oldPassword,password)) {
	  throw 'old password wrong';
	}
	return Users.findOneAndUpdate(
		{ phone },
		{ $set: { password: hashedNewPassword } },
		{ new: true },
	);
  };

const AuthController = {
  handleLogin,
  register,
  verifyToken,
  forgotPassword,
  changePassword,
};

export default AuthController;
