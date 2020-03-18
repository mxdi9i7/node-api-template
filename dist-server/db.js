"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

require('dotenv').config();

var connectionString = process.env.DB_CONNECTION_STRING;
var isConnected;

var connectToDatabase = () => {
  if (isConnected) {
    console.log('=> using existing database connection');
    return Promise.resolve();
  }

  console.log('=> using new database connection');
  return _mongoose.default.connect(connectionString, {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }).then(db => {
    isConnected = db.connections[0].readyState;
    console.log('Connection Success!');
  }).catch(e => {
    console.log(e);
  });
};

var _default = connectToDatabase;
exports.default = _default;