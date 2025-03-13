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

          if (!(_mongoose["default"].connection.readyState === 1)) {
            _context.next = 4;
            break;
          }

          console.log("Already connected to MongoDB");
          return _context.abrupt("return");

        case 4:
          _context.next = 6;
          return regeneratorRuntime.awrap(_mongoose["default"].connect(process.env.MONGODB_URI));

        case 6:
          console.log("Connected to MongoDB");
          _context.next = 12;
          break;

        case 9:
          _context.prev = 9;
          _context.t0 = _context["catch"](0);
          console.error("Error connecting to database:", _context.t0);

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[0, 9]]);
};

exports.connectMongoDB = connectMongoDB;