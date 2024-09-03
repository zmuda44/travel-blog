import { gql } from '@apollo/client';  


export const GET_USER_TRIPS = gql`
  query getUserTrips {
    me {
      _id
      username
      trips {
        _id
        location
        journalEntry
        startTripDate
        endTripDate
      }
    }
  }
`;

  export const GET_TRIP = gql`
    query GetTrip($tripId: ID!) {
      trip(id: $tripId) {
        _id
        destination
      }
    }
  `
