"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// The GraphQL schema in string form
const typeDefs = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map