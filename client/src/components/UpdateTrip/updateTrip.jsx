import { useState } from 'react';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { UPDATE_TRIP, UPDATE_DREAM_TRIP } from '../../utils/mutations';


function UpdateTrip({ trip }) {
  const tripId = trip._id

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

  const [userFormState, setUserFormState] = useState({
    location: trip.location,
    journalEntry: trip.journalEntry,
    startTripDate: trip.startTripDate || null,
    endTripDate: trip.endTripDate || null,
  });

  const [updateTrip] = useMutation(UPDATE_TRIP);
  const [updateDreamTrip] = useMutation(UPDATE_DREAM_TRIP);
  

  const { data: { username } } = Auth.getProfile();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormState({
      ...userFormState,
      [name]: value,
    });

  };

  const handleOnFocus = (event) => {
    const { name } = event.target;
    setUserFormState({
      ...userFormState,
      [name]: '',
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { location, journalEntry, startTripDate, endTripDate } = userFormState;
    
      if (!startTripDate && !endTripDate) {
        console.log(updateDreamTrip)
        await updateDreamTrip({
          variables: { tripId, location, journalEntry, username },
        });
      }
      else {

        await updateTrip({
          variables: { tripId, location, journalEntry, username, startTripDate, endTripDate },
        });
      }
      window.location.reload()
    }
 



    


  return (
    <form onSubmit={handleSubmit}>
      <div>
      {userFormState.startTripDate && (
        <p>Start Date: {formattedStartDate}</p>
        /* <input
          type="date"
          value={userFormState.startTripDate ? new Date(userFormState.startTripDate).toISOString().split('T')[0] : ''}
          onChange={(e) => handleInputChange('startTripDate', e.target.value)}
        /> */
      )}
      </div>
      <div>
      {userFormState.endTripDate && (
        <p>End Date: {formattedEndDate} </p>
        /* <input
          type="date"
          value={userFormState.endTripDate ? new Date(userFormState.endTripDate).toISOString().split('T')[0] : ''}
          onChange={(e) => handleInputChange('endTripDate', e.target.value)}
        /> */
      )}
      </div>
      <div>
      <h3>{trip.location}</h3>
        <input
              className="form-input"
              placeholder="Location of trip"
              name="location"
              type="text"
              value={userFormState.location}
              onChange={handleInputChange}
              onFocus={handleOnFocus}
            />
      </div>
      <div>
      <p>{trip.journalEntry}</p>
        <input
              className="form-input"
              placeholder="Journal entry"
              name="journalEntry"
              type="text"
              value={userFormState.journalEntry}
              onChange={handleInputChange}
              onFocus={handleOnFocus}
            />
      </div>
      <button type="submit">Update Trip</button>
    </form>
  );
}

export default UpdateTrip;
