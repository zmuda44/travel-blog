// const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");
const { User } = require('../models');

// Secret key for JWT signing and verification
const secret = "mysecretssshhhhhhh";
// Expiration time for JWT tokens
const expiration = "2h";

module.exports = {
  // Custom error for unauthenticated access
  AuthenticationError: (message = "Could not authenticate user.") => {
    const error = new Error(message);
    error.status = 401;  // Unauthorized status code
    return error;
  },

  // Middleware function to authenticate requests
  authMiddleware: function (req, res, next) {

    // Extract token from request body, query parameters, or authorization header
    let token = req.body.token || req.query.token || req.headers.authorization;

    // If token is in the authorization header, remove 'Bearer ' prefix
    if (req.headers.authorization) {
      token = token.split(" ").pop().trim();
    }

    
    // If no token is provided, continue without authentication
    if (!token) {
      return req;
    }

    try {
      // Verify the token and attach user data to the request object
      const { data } = jwt.verify(token, secret, { maxAge: expiration });
      req.user = data;
    } catch {
      // Log invalid token attempts
      console.log("Invalid token");
    }

    // Return the modified request object
    next();
  },

  // Function to generate a JWT token
  signToken: function ({ email, username, _id }) {
    // Create a payload with user data
    const payload = { email, username, _id };
    // Sign and return the token with expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};


//from chat gpt

// authMiddleware = async (req, res, next) => {
//   // Get token from Authorization header
//   const token = req.headers.authorization || '';

//   if (!token) {
//     return res.status(401).json({ message: 'You need to be logged in!' });
//   }

//   try {
//     // Remove 'Bearer ' part of the token if it exists
//     const tokenWithoutBearer = token.replace(/^Bearer\s/, '');
    
//     // Verify the token and decode the user payload
//     const decoded = jwt.verify(tokenWithoutBearer, 'your-secret-key');
    
//     // Find the user based on the decoded ID
//     const user = await User.findById(decoded._id);

//     if (!user) {
//       return res.status(401).json({ message: 'Invalid/Expired token' });
//     }

//     // Attach the user to the request object for use in route handlers
//     req.user = user;

//     // Continue to the next middleware or route handler
//     next();
//   } catch (err) {
//     return res.status(401).json({ message: 'Invalid/Expired token' });
//   }
// };




// module.exports = {
//   // function for our authenticated routes
//   authMiddleware: function (req, res, next) {
//     // allows token to be sent via  req.query or headers
//     let token = req.query.token || req.headers.authorization;

//     // ["Bearer", "<tokenvalue>"]
//     if (req.headers.authorization) {
//       token = token.split(' ').pop().trim();
//     }

//     if (!token) {
//       return res.status(400).json({ message: 'You have no token!' });
//     }

//     // verify token and get user data out of it
//     try {
//       const { data } = jwt.verify(token, secret, { maxAge: expiration });
//       req.user = data;
//     } catch {
//       console.log('Invalid token');
//       return res.status(400).json({ message: 'invalid token!' });
//     }

//     // send to next endpoint
//     next();
//   },



