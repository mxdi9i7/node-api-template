"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var PostSchema = new _mongoose.default.Schema({
  text: String
});

var Posts = _mongoose.default.model('Posts', PostSchema);

var _default = Posts;
exports.default = _default;