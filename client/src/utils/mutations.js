import { gql } from '@apollo/client'; // Import gql from Apollo Client to define GraphQL queries and mutations




// Mutation to add a new user
export const ADD_USER = gql`
  mutation AddUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
        email
      }
    }
  }
`;

// Mutation to log in a user
export const LOGIN_USER = gql`
  mutation loginUser($username: String!, $password: String!) {
    loginUser(username: $username, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

// Mutation to add a new trip
export const ADD_TRIP = gql`

mutation AddTrip($username: String!, $location: String!, $journalEntry: String!, $startTripDate: Date!, $endTripDate: Date!) {
  addTrip(username: $username, location: $location, journalEntry: $journalEntry, startTripDate: $startTripDate, endTripDate: $endTripDate) {
    username
    trips {
      location
      journalEntry
      startTripDate
      endTripDate
    }
  }
}
`
export const ADD_DREAM_TRIP = gql`
mutation AddDreamTrip($username: String! $location: String!, $journalEntry: String!) {
  addDreamTrip(username: $username, location: $location, journalEntry: $journalEntry) {
    username
    trips {
      location
      journalEntry
    }
  }
}
`

export const REMOVE_TRIP = gql`
  mutation RemoveTrip($tripId: ID!) {
    removeTrip(tripId: $tripId) {
      _id
      username
      trips {
        _id
        location
      }
    }
  }
`;

export const UPDATE_TRIP = gql`
  mutation udpateTrip($tripId: ID!, $location: String!, $journalEntry: String!, $startTripDate: Date!, $endTripDate: Date!) {
    updateTrip(tripId: $tripId, location: $location, journalEntry: $journalEntry, startTripDate: $startTripDate, endTripDate: $endTripDate) {
      _id
      username
      trips {
        _id
        location
      }
    }
  }
`;


export const UPDATE_DREAM_TRIP = gql`
  mutation udpateDreamTrip($tripId: ID!, $location: String!, $journalEntry: String!) {
    updateDreamTrip(tripId: $tripId, location: $location, journalEntry: $journalEntry) {
      _id
      username
    }
  }
`;
















