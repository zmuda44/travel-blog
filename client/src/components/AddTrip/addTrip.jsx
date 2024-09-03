import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_TRIP } from "../../utils/mutations";
import { ADD_DREAM_TRIP } from "../../utils/mutations";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Auth from "../../utils/auth";
import "./addTrip.css";

const AddTrip = () => {
  const [userFormState, setFormState] = useState({
    location: "",
    journalEntry: "",
    tripDate: new Date(),
    startTripDate: new Date(),
    endTripDate: new Date(),
  });

  const [dreamTrip, setDreamTrip] = useState(false);

  const {
    data: { username },
  } = Auth.getProfile();

  const [addTrip, { loading: addTripLoading, data: dataAddTrip }] =
    useMutation(ADD_TRIP);
  const [addDreamTrip, { loading: dreamTripLoading, data: dataDreamTrip }] =
    useMutation(ADD_DREAM_TRIP);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...userFormState,
      [name]: value,
    });
  };

  const handleDateChange = (date, fieldName) => {
    setFormState({
      ...userFormState,
      [fieldName]: date,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { location, journalEntry, startTripDate, endTripDate } =
        userFormState;

      console.log(dreamTrip);
      if (dreamTrip == true) {
        console.log(dreamTrip);
        await addDreamTrip({
          variables: { location, journalEntry, username },
        });
      } else {
        await addTrip({
          variables: {
            location,
            journalEntry,
            startTripDate,
            endTripDate,
            username,
          },
        });
      }

      setFormState({
        location: "",
        journalEntry: "",
        startTripDate: new Date(),
        endTripDate: new Date(),
      });
      setDreamTrip(false); // Reset dream trip checkbox

      window.location.reload();
    } catch (e) {
      console.error(e);
    }
  };

  const handleDreamTripChange = () => {
    setDreamTrip(!dreamTrip);
    if (!dreamTrip) {
      setFormState({
        ...userFormState,
        startTripDate: null,
        endTripDate: null,
      });
    }
  };

  return (
    <div className="add-trip-container">
      <h4>Add Trip</h4>
      <form onSubmit={handleFormSubmit}>
        <input
          className="form-input location-input"
          placeholder="Location of trip"
          name="location"
          type="text"
          value={userFormState.location}
          onChange={handleChange}
        />
        <input
          className="form-input journal-input"
          placeholder="Journal entry"
          name="journalEntry"
          type="text"
          value={userFormState.journalEntry}
          onChange={handleChange}
        />
        <DatePicker
          selected={userFormState.startTripDate}
          onChange={(date) => handleDateChange(date, "startTripDate")}
          className="form-input start-date"
          placeholderText="Start Date"
          disabled={dreamTrip}
        />
        <DatePicker
          selected={userFormState.endTripDate}
          onChange={(date) => handleDateChange(date, "endTripDate")}
          className="form-input end-date"
          placeholderText="End Date"
          disabled={dreamTrip}
        />
        <label>
          <input
            type="checkbox"
            checked={dreamTrip}
            onChange={handleDreamTripChange}
          />
          Dream Trip (no specific dates)
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTrip;
