const express = require("express");
const { ApolloServer } = require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");
const { authMiddleware } = require("./utils/auth");
const path = require("node:path");

// Import the GraphQL schema type definitions and resolvers
const { typeDefs, resolvers } = require("./schemas");
// Import the database connection configuration
const db = require("./config/connection");

const PORT = process.env.PORT || 3001;  // Define the port for the server
const app = express();  // Initialize an Express application
const server = new ApolloServer({
  typeDefs,  // GraphQL schema type definitions
  resolvers, // GraphQL schema resolvers
});

// Function to start the Apollo Server and Express application
const startApolloServer = async () => {
  await server.start();  // Start the Apollo Server

  // Middleware to parse URL-encoded and JSON request bodies
  app.use(express.urlencoded({ extended: false }));
  app.use(express.json());

  // Middleware to handle GraphQL requests
  app.use(
    "/graphql",
    expressMiddleware(server, {
      context: authMiddleware,  // Apply authentication middleware to the GraphQL context
    })
  );

  // Serve static files and handle client-side routing in production
  if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../client/dist"))); // Serve static files from the client build directory

    app.get("*", (req, res) => {
      // For any routes not handled by the server, send the main index.html file
      res.sendFile(path.join(__dirname, "../client/dist/index.html"));
    });
  }

  // Start the database connection and listen on the defined port
  db.once("open", () => {
    app.listen(PORT, () => {
      console.log(`API server running on port ${PORT}!`); // Log server start
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`); // Log GraphQL endpoint
    });
  });
};

// Call the async function to start the server
startApolloServer();

