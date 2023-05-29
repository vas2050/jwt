const { gql } = require('apollo-server-express');

const schema = gql`
   type Query {
       greet: String
       movie(id: Int!): Movie
       movies(genre: String): [Movie]
   },
   type Movie {
       id: Int
       title: String
       year: Int
       genre: String
       director: String
       producer: String
       actors: [String]
       url: String
   }
`;

module.exports = schema;
