"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
// The GraphQL schema in string form
const typeDefsOld = `
  type Query { books: [Book] }
  type Book { title: String, author: String }
`;

const typeDefs = `
  type Query { 
    """
    the list of surveys
    """
    surveys(search: String, active: Boolean, first: Int = 0, count: Int = 20): [Survey] 
  }
  """
  Survey instance
  """
  type Survey { id: ID, name: String!, description: String, active: Boolean!, numberOfQuestions: Int! }
`;

exports.default = typeDefs;
//# sourceMappingURL=typeDefs.js.map