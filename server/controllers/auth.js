import Users from "../models/User";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { config } from "../helpers/jwt";

const verifyToken = token => jwt.verify(token, config.secret);

const handleLogin = async data => {
  const { phone, password } = data;
  try {
    const user = await Users.findOne({ phone });
    if (user && bcrypt.compareSync(password, user.password)) {
      const token = jwt.sign({ sub: user.id }, config.secret);
      const { friends, _id, firstName, lastName, email, age, phone } = user;
      const publicInfo = {
        friends,
        _id,
        firstName,
        lastName,
        email,
        age,
        phone
      };
      return {
        data: { ...publicInfo, token },
        success: true
      };
    } else {
      return {
        data: "Password incorrect",
        success: false
      };
    }
  } catch (error) {
    return {
      data: error.message,
      success: false
    };
  }
};

const register = async data => {
  const { phone, password } = data;

  try {
    // validate
    if (await Users.findOne({ phone })) {
      throw {
        message: 'Username with number of "' + phone + '" is already taken'
      };
    }

    const hash = bcrypt.hashSync(password, 10);
    const newUser = await Users.create({
      ...data,
      password: hash
    });
    return newUser;
  } catch (error) {
    return {
      data: error.message,
      success: false
    };
  }
};

const AuthController = {
  handleLogin,
  register
};

export default AuthController;
