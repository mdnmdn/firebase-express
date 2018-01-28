import { makeExecutableSchema } from 'graphql-tools';

import typeDefs from './typeDefs';
import resolvers from './resolvers';

// Put together a schema
const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

export default schema;
