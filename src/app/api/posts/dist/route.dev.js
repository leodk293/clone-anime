"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.handler = handler;
exports.DELETE = exports.POST = exports.GET = void 0;

var _server = require("next/server");

var _connectMongoDB = require("@/lib/db/connectMongoDB");

var _posts = _interopRequireDefault(require("@/lib/models/posts"));

var _users = _interopRequireDefault(require("@/lib/models/users"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// Handler function to process the request based on the method
function handler(request) {
  var method;
  return regeneratorRuntime.async(function handler$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          method = request.method;
          _context.t0 = method;
          _context.next = _context.t0 === 'GET' ? 4 : _context.t0 === 'POST' ? 5 : _context.t0 === 'DELETE' ? 6 : 7;
          break;

        case 4:
          return _context.abrupt("return", handleGET(request));

        case 5:
          return _context.abrupt("return", handlePOST(request));

        case 6:
          return _context.abrupt("return", handleDELETE(request));

        case 7:
          return _context.abrupt("return", _server.NextResponse.json({
            message: "Method ".concat(method, " Not Allowed")
          }, {
            status: 405
          }));

        case 8:
        case "end":
          return _context.stop();
      }
    }
  });
}

function handleGET(request) {
  var posts;
  return regeneratorRuntime.async(function handleGET$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          _context2.prev = 0;
          _context2.next = 3;
          return regeneratorRuntime.awrap((0, _connectMongoDB.connectMongoDB)());

        case 3:
          _context2.next = 5;
          return regeneratorRuntime.awrap(_posts["default"].find().populate('author', 'fullName email'));

        case 5:
          posts = _context2.sent;
          return _context2.abrupt("return", _server.NextResponse.json(posts));

        case 9:
          _context2.prev = 9;
          _context2.t0 = _context2["catch"](0);
          console.error("Error fetching posts:", _context2.t0);
          return _context2.abrupt("return", _server.NextResponse.json({
            message: _context2.t0.message
          }, {
            status: 500
          }));

        case 13:
        case "end":
          return _context2.stop();
      }
    }
  }, null, null, [[0, 9]]);
}

function handlePOST(request) {
  var _ref, title, content, authorId, userImage, authorExists, newPost;

  return regeneratorRuntime.async(function handlePOST$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.prev = 0;
          _context3.next = 3;
          return regeneratorRuntime.awrap((0, _connectMongoDB.connectMongoDB)());

        case 3:
          _context3.next = 5;
          return regeneratorRuntime.awrap(request.json());

        case 5:
          _ref = _context3.sent;
          title = _ref.title;
          content = _ref.content;
          authorId = _ref.authorId;
          userImage = _ref.userImage;

          if (!(!title || !content || !authorId || !userImage)) {
            _context3.next = 12;
            break;
          }

          return _context3.abrupt("return", _server.NextResponse.json({
            message: "Missing title, content, or author"
          }, {
            status: 400
          }));

        case 12:
          _context3.next = 14;
          return regeneratorRuntime.awrap(_users["default"].findById(authorId));

        case 14:
          authorExists = _context3.sent;

          if (authorExists) {
            _context3.next = 17;
            break;
          }

          return _context3.abrupt("return", _server.NextResponse.json({
            message: "Author not found"
          }, {
            status: 404
          }));

        case 17:
          _context3.next = 19;
          return regeneratorRuntime.awrap(_posts["default"].create({
            title: title,
            content: content,
            author: authorId,
            userImage: userImage
          }));

        case 19:
          newPost = _context3.sent;
          return _context3.abrupt("return", _server.NextResponse.json({
            message: 'Post created successfully',
            post: newPost
          }, {
            status: 201
          }));

        case 23:
          _context3.prev = 23;
          _context3.t0 = _context3["catch"](0);
          console.error("Error creating post:", _context3.t0);
          return _context3.abrupt("return", _server.NextResponse.json({
            message: _context3.t0.message
          }, {
            status: 500
          }));

        case 27:
        case "end":
          return _context3.stop();
      }
    }
  }, null, null, [[0, 23]]);
}

function handleDELETE(request) {
  var url, id, userId, post;
  return regeneratorRuntime.async(function handleDELETE$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.prev = 0;
          url = new URL(request.url);
          id = url.searchParams.get("id");
          userId = url.searchParams.get("userId");

          if (id) {
            _context4.next = 6;
            break;
          }

          return _context4.abrupt("return", _server.NextResponse.json({
            message: "Post ID not found"
          }, {
            status: 400
          }));

        case 6:
          if (userId) {
            _context4.next = 8;
            break;
          }

          return _context4.abrupt("return", _server.NextResponse.json({
            message: "User ID required"
          }, {
            status: 401
          }));

        case 8:
          _context4.next = 10;
          return regeneratorRuntime.awrap((0, _connectMongoDB.connectMongoDB)());

        case 10:
          _context4.next = 12;
          return regeneratorRuntime.awrap(_posts["default"].findById(id));

        case 12:
          post = _context4.sent;

          if (post) {
            _context4.next = 15;
            break;
          }

          return _context4.abrupt("return", _server.NextResponse.json({
            message: "Post not found"
          }, {
            status: 404
          }));

        case 15:
          if (!(post.author.toString() !== userId)) {
            _context4.next = 17;
            break;
          }

          return _context4.abrupt("return", _server.NextResponse.json({
            message: "Unauthorized: Only the owner can delete this post"
          }, {
            status: 403
          }));

        case 17:
          _context4.next = 19;
          return regeneratorRuntime.awrap(_posts["default"].findByIdAndDelete(id));

        case 19:
          return _context4.abrupt("return", _server.NextResponse.json({
            message: "Post deleted successfully"
          }, {
            status: 200
          }));

        case 22:
          _context4.prev = 22;
          _context4.t0 = _context4["catch"](0);
          console.error("Error deleting post:", _context4.t0);
          return _context4.abrupt("return", _server.NextResponse.json({
            message: _context4.t0.message
          }, {
            status: 500
          }));

        case 26:
        case "end":
          return _context4.stop();
      }
    }
  }, null, null, [[0, 22]]);
}

var GET = handleGET;
exports.GET = GET;
var POST = handlePOST;
exports.POST = POST;
var DELETE = handleDELETE;
exports.DELETE = DELETE;