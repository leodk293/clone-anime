"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.connectMongoDB = void 0;

var _mongoose = _interopRequireDefault(require("mongoose"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var connectMongoDB = function connectMongoDB() {
  return regeneratorRuntime.async(function connectMongoDB$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.prev = 0;
          _context.next = 3;
          return regeneratorRuntime.awrap(_mongoose["default"].connect(process.env.MONGODB_URI));

        case 3:
          console.log("Connected to MONGODB");
          _context.next = 9;
          break;

        case 6:
          _context.prev = 6;
          _context.t0 = _context["catch"](0);
          console.log("Error connecting to database: ", _context.t0);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 6]]);
};

exports.connectMongoDB = connectMongoDB;