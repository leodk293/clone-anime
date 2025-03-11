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
  var body, fullName, email, image, isUserExits;
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
          fullName = body.fullName, email = body.email, image = body.image;
          _context.next = 8;
          return regeneratorRuntime.awrap((0, _connectMongoDB.connectMongoDB)());

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap(_users["default"].findOne({
            email: email
          }));

        case 10:
          isUserExits = _context.sent;

          if (isUserExits) {
            _context.next = 18;
            break;
          }

          _context.next = 14;
          return regeneratorRuntime.awrap(_users["default"].create({
            fullName: fullName,
            email: email,
            image: image
          }));

        case 14:
          console.log("user created");
          return _context.abrupt("return", _server.NextResponse.json({
            message: "User Registered"
          }, {
            status: 201
          }));

        case 18:
          return _context.abrupt("return", _server.NextResponse.json({
            message: "User already exists"
          }, {
            status: 409
          }));

        case 19:
          _context.next = 25;
          break;

        case 21:
          _context.prev = 21;
          _context.t0 = _context["catch"](0);
          console.error(_context.t0);
          return _context.abrupt("return", _server.NextResponse.json({
            message: "Failed to register user"
          }, {
            status: 500
          }));

        case 25:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 21]]);
}