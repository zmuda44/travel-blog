const mongoose = require('mongoose');
const dotenv = require('dotenv').config();

// Connect to MongoDB using the connection URI from environment variables,
// or fallback to a local MongoDB instance if the environment variable is not set.
mongoose.connect(process.env.MONGODB_URI || process.env.db);

// Export the mongoose connection object to be used elsewhere in the application
module.exports = mongoose.connection;

