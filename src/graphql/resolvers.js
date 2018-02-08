import api from '../api/index';


// Some fake data
const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
  },
];


// The resolvers
const resolvers = {
  Query: { 
    //books: () => books 
    surveys: (parent, args, context, info) => api.list({...args})
  },
};

export default resolvers;