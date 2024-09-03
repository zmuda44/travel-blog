
import Auth from '../../utils/auth';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { REMOVE_TRIP, UPDATE_TRIP } from '../../utils/mutations';
import UpdateTrip from '../UpdateTrip/updateTrip';

function UpcomingTrips({ trips }) {
  // GraphQL mutations for removing and updating trips
  const [removeTrip] = useMutation(REMOVE_TRIP);

  // Get username from Auth profile
  const { data: { username } } = Auth.getProfile();
  // Local state for handling form data and form visibility
  const [formState, setFormState] = useState({});
  const [showFormState, setShowFormState] = useState({});
  // Handle input changes for form data

  // Toggle the visibility of the form for each trip
  const toggleFormVisibility = (tripId) => {
    setShowFormState((prevState) => ({
      ...prevState,
      [tripId]: !prevState[tripId], // Toggle visibility
    }));
  };
  // Handle trip deletion
  const handleDeleteTrip = async (tripId) => {
    try {
      await removeTrip({ variables: { username, tripId } });
      console.log('Trip deleted successfully');
    } catch (error) {
      console.error('Error deleting trip:', error);
    }
  };


  return (
    <div id="trips-box">
      {trips.map((trip) => {
        // Convert trip dates to a readable format
        const formattedStartDate = new Date(trip.startTripDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        const formattedEndDate = new Date(trip.endTripDate).toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        });
        const tripForm = formState[trip._id] || {};
        const showForm = showFormState[trip._id] || false; // Check if the form should be visible
        return (
          <div key={trip._id}>
            {!showForm && (
              <div>
                <p>Start Date: {formattedStartDate}</p>
                <p>End Date: {formattedEndDate}</p>
                <h3>{trip.location}</h3>
                <p>{trip.journalEntry}</p>
              </div>
            )}
            {showForm && (
              <UpdateTrip
                trip={trip}
                // tripForm={tripForm}
                // onInputChange={handleInputChange}
                // onUpdateTrip={() => handleUpdateTrip(trip._id)}
              />
            )}
            <button onClick={() => toggleFormVisibility(trip._id)}>
              {showForm ? 'Discard Changes' : 'Update Trip'}
            </button>
            <button onClick={() => handleDeleteTrip(trip._id)}>
              Delete Trip
            </button>
          </div>
        );
      })}
    </div>
  );
}
export default UpcomingTrips;
