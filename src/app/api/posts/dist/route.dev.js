"use strict";

var _server = require("next/server");

var _connectMongoDB = require("@/lib/db/connectMongoDB");

var _posts = _interopRequireDefault(require("@/lib/models/posts"));

var _users = _interopRequireDefault(require("@/lib/models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }