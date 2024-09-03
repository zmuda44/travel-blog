// Define the GraphQL schema using SDL (Schema Definition Language)
const typeDefs = `
scalar Date

  type User {
    _id: ID  
    username: String  
    email: String  
    profile: String  
    trips: [Trip]  
    friends: [User]  
  }


  type Trip {
    _id: ID  
    location: String  
    journalEntry: String 
    startTripDate: Date
    endTripDate: Date 
    comments: [Comment]  
  }

  type Comment {
    _id: ID  
    comment: String  
    username: String  
  }

  type Auth {
    token: String  
    user: User  
  }


  type Query {
    users: [User]  
    user(id: ID!): User  
    me: User  
  }


  type Mutation {
    addUser(username: String!, email: String!, password: String!): Auth  
    loginUser(username: String!, password: String!): Auth  
    addTrip(username: String! location: String!, journalEntry: String!, startTripDate: Date!, endTripDate: Date!): User
    addDreamTrip(username: String!, location: String!, journalEntry: String!): User
    removeTrip(tripId: ID!): User  # New mutation for removing a trip
    updateTrip(tripId: ID! location: String!, journalEntry: String!, startTripDate: Date!, endTripDate: Date!): User
    updateDreamTrip(tripId: ID! location: String!, journalEntry: String!): User
    addComment(commentText: String!): Comment  
    removeComment(commentId: ID!): Comment  

  }
`;

module.exports = typeDefs;




