const movies = require('./movieDB');

const resolvers = {
   Query: {
      greet: () => 'hello there!',
      movie: (parent, { id }, context, info) => movies.find((m) => m.id === id),
      movies: (_, { genre }) => genre && movies.filter((m) => m.genre.toUpperCase() === genre.toUpperCase()) || movies
   },
};

module.exports = resolvers;
