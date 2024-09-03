const { GraphQLError } = require("graphql");
const jwt = require("jsonwebtoken");

// Secret key for JWT signing and verification
const secret = "mysecretssshhhhhhh";
// Expiration time for JWT tokens
const expiration = "2h";

module.exports = {
  // Custom error for unauthenticated access
  AuthenticationError: new GraphQLError("Could not authenticate user.", {
    extensions: {
      code: "UNAUTHENTICATED",  // Error code indicating authentication failure
    },
  }),

  // Middleware function to authenticate requests
  authMiddleware: function ({ req }) {
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
    return req;
  },

  // Function to generate a JWT token
  signToken: function ({ email, username, _id }) {
    // Create a payload with user data
    const payload = { email, username, _id };
    // Sign and return the token with expiration time
    return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
  },
};


// set token secret and expiration date
// const secret = 'mysecretsshhhhh';
// const expiration = '2h';

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

// signToken: function ({ username, email, _id }) {
//     const payload = { username, email, _id };

//     return jwt.sign({ data: payload }, secret, { expiresIn: expiration });
//   },
// };
