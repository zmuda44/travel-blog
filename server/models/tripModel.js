const mongoose = require("mongoose");

// Define a schema for comments on trips
const commentSchema = new mongoose.Schema({
  comment: {
    type: String,
    required: true, // Ensure that each comment has text
  },
  username: {
    type: String,
    required: true, // Ensure that each comment includes a username
  },
  createdDate: {
    type: Date,
    // Optional: Uncomment the next line to set the current date as the default
    // default: Date.now
  },
});

// Define a schema for trips
const tripSchema = new mongoose.Schema({
  location: {
    type: String,
    required: true, // Ensure that each trip has a location
  },
  startTripDate: {
    type: Date,
    // Optional: Uncomment the next line to set the current date as the default
    default: null
  },
  endTripDate: {
    type: Date,
    // Optional: Uncomment the next line to set the current date as the default
    default: null
  },
  journalEntry: {
    type: String,
    // Optional: This field can be empty if no journal entry is provided
  },
  comments: [commentSchema], // Embed comments schema to allow multiple comments per trip
  // Future features: Uncomment if these fields are to be implemented
  // todos: {
  //     type: String
  // },
  // weatherAdvisory: {
  //     type: String
  // }
});

// Create a model for the trip schema
const Trip = mongoose.model("Trip", tripSchema);

// Export the Trip model for use in other parts of the application
module.exports = Trip;

