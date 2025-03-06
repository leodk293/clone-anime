"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.POST = POST;

var _connectMongoDB = require("@/lib/db/connectMongoDB");

var _server = require("next/server");

var _users = _interopRequireDefault(require("@/lib/models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function POST(request) {
  var body, name, email;
  return regeneratorRuntime.async(function POST$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(request.json());

        case 3:
          body = _context.sent;
          console.log(body);
          name = body.name, email = body.email;
          _context.next = 8;
          return regeneratorRuntime.awrap((0, _connectMongoDB.connectMongoDB)());

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(_users["default"].create({
            name: name,
            email: email
          }));

        case 10:
          console.log("user created");
          return _context.abrupt("return", _server.NextResponse.json({
            message: "User Registered"
          }, {
            status: 201
          }));

        case 14:
          _context.prev = 14;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            message: "Failed to register user"
          }, {
            status: 500
          }));

        case 18:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 14]]);
}