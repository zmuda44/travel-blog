import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import AddTrip from "../../components/AddTrip/addTrip";
import UpcomingTrips from "../../components/Trips/upcomingTrips";
import PreviousTrips from "../../components/Trips/previousTrips";
import DreamTrips from "../../components/Trips/dreamTrips";
import "./profile.css";
import natl_park from "../../assets/natl_park.png";
import { Navigate, useParams } from "react-router-dom";
import { useQuery, useLazyQuery } from "@apollo/client";

import { GET_USER_TRIPS } from "../../utils/queries";

import Auth from "../../utils/auth";

const Profile = () => {
  const [loadUserTrips, { called, loading, data }] =
    useLazyQuery(GET_USER_TRIPS);
  // const user = data?.me || {};

  const upcomingTrips = [];
  const prevTrips = [];
  const dreamTrips = [];

  const [user, setUser] = useState({ trips: [] });
  useEffect(() => {
    loadUserTrips();
    if (data) {
      setUser(data.me);
    }
  }, [data, user.trips]);

  for (const trip of user.trips) {
    let startTripDate = "";
    if (trip.startTripDate) {
      startTripDate = new Date(trip.startTripDate).getTime();
    } else {
      startTripDate = "";
    }

    if (startTripDate === "") {
      console.log("Dream trip");
      dreamTrips.push(trip);
    } else if (startTripDate > Date.now()) {
      console.log("Upcoming trip");
      upcomingTrips.push(trip);
    } else {
      console.log("Previous trip");
      prevTrips.push(trip);
    }
  }

  if (!Auth.loggedIn()) {
    return <Navigate to="/" />;
  }

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <div>
        <Header />
      </div>
      <main id="profile">
        <img src={natl_park} alt="Northern lights" className="profileBg"></img>
        {/* Main content */}
        <div id="main-content">
          <h1>Welcome, {user.username}!</h1>

          <AddTrip />

          <div className="trip-boxes-container">
            {/* Upcoming trips box */}
            <div id="upcoming-trips-box">
              <Link to="/upcomingtrips">Upcoming Trips</Link>
              <UpcomingTrips trips={upcomingTrips} />
            </div>

            {/* Previous trips box */}
            <div id="previous-trips-box">
              <Link to="/previoustrips">Previous Trips</Link>
              <PreviousTrips trips={prevTrips} />
            </div>

            {/* Dream trips box */}
            <div id="dream-trips-box">
              <Link to="/dreamtrips">Dream Trips</Link>
              <DreamTrips trips={dreamTrips} />
            </div>
          </div>
        </div>

        {/* User icon box */}
        <div id="user-icon-box">{/* Add your user icon here */}</div>
      </main>
    </div>
  );
};

export default Profile;
