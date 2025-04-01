import { useState } from 'react';
import Auth from '../../utils/auth';


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
    dreamTrip: trip.dreamTrip
  });  

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
    
    try {
      const response = await fetch(`/api/trips/${tripId}`,
        {
          method: 'PUT',          
          headers: {
            "Content-type": 'application/json',
          },
          body: JSON.stringify(userFormState)
        },
      )

      const data = await response.json()

      window.location.reload()

    }
    catch (err) {
      console.log(err)
    }
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
              required
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
