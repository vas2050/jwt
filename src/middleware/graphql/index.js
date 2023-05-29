const { ApolloServer } = require('apollo-server-express');
const { verifyToken } = require('../../lib/auth/utils');
const { resolvers, typeDefs } = require('../../lib/graphql');

module.exports = async (app, callback) => { 
   const server = new ApolloServer({
      typeDefs,
      resolvers,
      context: ({ req: { headers: { authorization: auth }}}) => verifyToken(auth.split(' ')[1])
   });

   try {
      await server.start();
      server.applyMiddleware({ app });
      callback(null);
   }
   catch (err) {
      callback(err);
   }
};
