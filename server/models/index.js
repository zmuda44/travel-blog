// Import the Trip and User models from their respective files
const Trip = require("./tripModel");
const User = require("./userModel");

// Export an object containing the Trip and User models
// This allows other parts of the application to access these models
module.exports = {
  Trip,
  User,
};
