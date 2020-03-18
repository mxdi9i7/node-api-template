"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _User = _interopRequireDefault(require("../models/User"));

var _paginate = _interopRequireDefault(require("../helpers/paginate"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchUsers = () => {
  return _User.default.find();
};

var UserController = {
  fetchUsers
};
var _default = UserController;
exports.default = _default;