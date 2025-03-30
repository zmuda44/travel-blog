import { useState } from "react";
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
    dreamTrip: false,
  });

  const [dreamTrip, setDreamTrip] = useState(false);

  // const {
  //   data: { username },
  // } = Auth.getProfile();

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

  const handleDreamTripChange = () => {
    setDreamTrip(!dreamTrip);
    if (!dreamTrip) {
      setFormState({
        ...userFormState,
        dreamTrip: true
    });
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    console.log(userFormState)

    let token = Auth.getToken()

    try {
        const response = await fetch('/api/trips/create', 
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`              
            },
            body: JSON.stringify(userFormState)
          }
        )

        const data = await response.json()      

      setFormState({
        location: "",
        journalEntry: "",
        startTripDate: new Date(),
        endTripDate: new Date(),
      });

      setDreamTrip(false); // Reset dream trip checkbox

      // window.location.reload();
    } catch (e) {
      console.error(e);
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
          Dream Trip
        </label>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddTrip;
