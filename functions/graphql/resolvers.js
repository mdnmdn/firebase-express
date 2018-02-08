'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _index = require('../api/index');

var _index2 = _interopRequireDefault(_index);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// Some fake data
const books = [{
  title: "Harry Potter and the Sorcerer's stone",
  author: 'J.K. Rowling'
}, {
  title: 'Jurassic Park',
  author: 'Michael Crichton'
}];

// The resolvers
const resolvers = {
  Query: {
    //books: () => books 
    surveys: (parent, args, context, info) => _index2.default.list(_extends({}, args))
  }
};

exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map