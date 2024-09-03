// Import the User and Trip models for database operations
const { User, Trip } = require("../models");

// Import utility functions for authentication and token management
const { signToken, AuthenticationError } = require("../utils/auth");

const { GraphQLScalarType, Kind } = require('graphql');

const resolvers = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    serialize(value) {
      // Value sent to the client
      return value instanceof Date ? value.toISOString() : null;
    },
    parseValue(value) {
      // Value from the client input variables
      return value ? new Date(value) : null;
    },
    parseLiteral(ast) {
      // Value from the client query
      if (ast.kind === Kind.STRING) {
        return new Date(ast.value);
      }
      return null;
    },
  }),
  Query: {
    // Query to fetch all users
    users: async () => {
      return await User.find({});
    },

    // Query to fetch the currently authenticated user
    me: async (parent, args, context) => {
      // Check if the user is authenticated
      if (context.user) {
        // Find and return the user based on the ID from context, and populate the trips field
        return await User.findOne({ _id: context.user._id }).populate('trips');
      }
      // Throw an authentication error if the user is not authenticated
      throw AuthenticationError;
    },
  },

  Mutation: {
    // Mutation for adding a new user
    addUser: async (parent, args) => {
      console.log(args);
      try {
        const { username, email, password } = args;
        // Create the user with the provided username, email, and password
        const user = await User.create({ username, email, password });
        // If user creation fails, throw an error
        if (!user) {
          throw new Error('Something is wrong!');
        }
        // Generate a token for the user
        const token = signToken(user);
        // Return the created user object and the token
        return { token, user };
      } catch (error) {
        console.error(error);
        // Return a specific error message in case of failure
        throw new Error('Failed to create user');
      }
    },

    // Mutation for logging in an existing user
    loginUser: async (parent, { username, password }) => {
      // Find the user by username
      const user = await User.findOne({ username });

      // Throw an authentication error if the user does not exist
      if (!user) {
        throw AuthenticationError;
      }

      // Check if the provided password matches the stored hashed password
      const correctPw = await user.isCorrectPassword(password);

      // Throw an authentication error if the password is incorrect
      if (!correctPw) {
        throw AuthenticationError;
      }

      // Generate a token for the user
      const token = signToken(user);
      // Return the token and user object
      return { token, user };
    },

    addTrip : async (parent, args, context) => {

      if(context.user) {
        const { location, journalEntry, startTripDate, endTripDate } = args;
        // Create the user with the provided username, email, and password
        const trip = await Trip.create({
          location, 
          journalEntry,
          startTripDate,
          endTripDate, 
        });
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $addToSet: { trips: trip } },
          { new: true, runValidators: true }
        );
        return user;
      } 
      // throw new AuthenticationError('You need to be logged in!');
    },
    addDreamTrip : async (parent, args, context) => {

      if(context.user) {
        const { username, location, journalEntry } = args;
        // Create the user with the provided username, email, and password
        console.log(location)
        const trip = await Trip.create({
           location, 
           journalEntry,
        });

        console.log(trip)

        const user = await User.findOneAndUpdate(
          { _id: context.user._id  },
          { $addToSet: { trips: trip } },
          { new: true, runValidators: true }
        );
        return user;
      } 
      // throw new AuthenticationError('You need to be logged in!');
    },
    removeTrip: async (parent, args, context) => {

      if (context.user) {
        // Find and remove the trip from the Trip collection
        const trip = await Trip.findOneAndDelete({ _id: args.tripId });

        // Throw an error if the trip doesn't exist
        if (!trip) {
          throw new Error("Trip not found");
        }

        // Update the user's trips by removing the deleted trip's ID
        const user = await User.findOneAndUpdate(
          { _id: context.user._id },
          { $pull: { trips: args.tripId } },
          { new: true }
        ).populate('trips'); // Populate trips after the update

        return user;
      }

      // Throw an error if the user is not authenticated
      throw new AuthenticationError('You need to be logged in!');
    },
    updateTrip: async (parent, args, context) => {
console.log(context.user)
      if (context.user) {
        // Find and remove the trip from the Trip collection
        const trip = await Trip.findOneAndUpdate({ _id: args.tripId }, 
          { $set: { location: args.location, journalEntry: args.journalEntry, startTripDate: args.startTripDate, endTripDate: args.endTripDate } },
          { runValidators: true, new: true }
        )
        // Throw an error if the trip doesn't exist
        if (!trip) {
          throw new Error("Trip not found");
        }

        // Update the user's trips by removing the deleted trip's ID
        // const user = await User.findOneAndUpdate(
        //   { _id: context.user._id },
        //   { $pull: { trips: args.tripId } },
        //   { new: true }
        // ).populate('trips'); // Populate trips after the update

        return trip;
      }

      // Throw an error if the user is not authenticated
      throw new AuthenticationError('You need to be logged in!');
    },
    updateDreamTrip: async (parent, args, context) => {
console.log(context.user)
      if (context.user) {
        // Find and remove the trip from the Trip collection
        const trip = await Trip.findOneAndUpdate({ _id: args.tripId }, 
          { $set: { location: args.location, journalEntry: args.journalEntry } },
          { runValidators: true, new: true }
        )
        // Throw an error if the trip doesn't exist
        if (!trip) {
          throw new Error("Trip not found");
        }


        return trip;
      }

      // Throw an error if the user is not authenticated
      throw new AuthenticationError('You need to be logged in!');
    }
  }
}


module.exports = resolvers;

