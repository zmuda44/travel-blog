// Import type definitions for the GraphQL schema
const typeDefs = require("./typedefs.js");

// Import resolver functions that handle the logic for GraphQL queries and mutations
const resolvers = require("./resolvers.js");

// Export the type definitions and resolvers for use in the GraphQL server setup
module.exports = { typeDefs, resolvers };


