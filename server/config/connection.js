const mongoose = require('mongoose');

// Connect to MongoDB using the connection URI from environment variables,
// or fallback to a local MongoDB instance if the environment variable is not set.
mongoose.connect(process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/nomadnotesdb');

// Export the mongoose connection object to be used elsewhere in the application
module.exports = mongoose.connection;

// mongodb+srv://donnacancode:DaC05201022@cluster0.zxsnm.mongodb.net/nomadnotesdb?retryWrites=true&w=majority&appName=Cluster0