"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _Post = _interopRequireDefault(require("../models/Post"));

var _paginate = _interopRequireDefault(require("../helpers/paginate"));

var _User = _interopRequireDefault(require("../models/User"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var fetchPosts = () => {
  return _Post.default.find();
};

var PostController = {
  fetchPosts
};
var _default = PostController;
exports.default = _default;