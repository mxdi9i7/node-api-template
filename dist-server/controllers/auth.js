"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _jsonwebtoken = _interopRequireDefault(require("jsonwebtoken"));

var _bcryptjs = _interopRequireDefault(require("bcryptjs"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { Promise.resolve(value).then(_next, _throw); } }

function _asyncToGenerator(fn) { return function () { var self = this, args = arguments; return new Promise(function (resolve, reject) { var gen = fn.apply(self, args); function _next(value) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value); } function _throw(err) { asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err); } _next(undefined); }); }; }

require('dotenv').config();

var jwtSecret = process.env.JWT_SECRET;

var verifyToken = token => _jsonwebtoken.default.verify(token, jwtSecret);

var handleLogin = /*#__PURE__*/function () {
  var _ref = _asyncToGenerator(function* (data) {});

  return function handleLogin(_x) {
    return _ref.apply(this, arguments);
  };
}();

var register = /*#__PURE__*/function () {
  var _ref2 = _asyncToGenerator(function* (data) {});

  return function register(_x2) {
    return _ref2.apply(this, arguments);
  };
}();

var AuthController = {
  handleLogin,
  register,
  verifyToken
};
var _default = AuthController;
exports.default = _default;