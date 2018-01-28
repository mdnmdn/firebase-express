'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

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
  Query: { books: () => books }
};

exports.default = resolvers;
//# sourceMappingURL=resolvers.js.map