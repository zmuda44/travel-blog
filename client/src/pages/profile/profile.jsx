import { React, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Header from "../../components/header";
import AddTrip from "../../components/AddTrip/addTrip";
import Trips from "../../components/Trips/Trips";
import "./profile.css";
import natl_park from "../../assets/natl_park.png";
import { Navigate, useParams } from "react-router-dom";
import Auth from "../../utils/auth";

const Profile = () => {
  // const [loadUserTrips, { called, loading, data }] = useLazyQuery(GET_USER_TRIPS);
  // const user = data?.me || {};

  let token = Auth.getToken()

  const upcomingTrips = [];
  const prevTrips = [];
  const dreamTrips = [];

  const [user, setUser] = useState({ following: [], trips: [] });

  useEffect(() => {
    const getUserData = async ()=> {
      try {
        const response = await fetch('/api/users/me', 
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              'Authorization': `Bearer ${token}`
            }    
          }
        )
        const data = await response.json()
        setUser(data)
      }
      catch (err) {
        console.log('error caught: ' + err)
      }
    }
    getUserData()
  }, [token])

  for (const trip of user.trips) {

    let startTripDate = "";
    if (trip.startTripDate) {
      startTripDate = new Date(trip.startTripDate).getTime();
    } else {
      startTripDate = "";
    }

    if (trip.dreamTrip == true) {
      dreamTrips.push(trip)
    } 
    else {
       if (startTripDate > Date.now()) {
        upcomingTrips.push(trip);
      } else {
        prevTrips.push(trip);
      }
    }
  }

  if (!Auth.loggedIn()) {
    return <Navigate to="/" />;
  }

  // if (loading) {
  //   return <div>Loading...</div>;
  // }
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
              {/* <Link to="/upcomingtrips">Upcoming Trips</Link> */}
              <Trips trips={upcomingTrips} />
            </div>

            {/* Previous trips box */}
            <div id="previous-trips-box">
              {/* <Link to="/previoustrips">Previous Trips</Link> */}
              <Trips trips={prevTrips} />
            </div>

            {/* Dream trips box */}
            <div id="dream-trips-box">
              {/* <Link to="/dreamtrips">Dream Trips</Link> */}
              <Trips trips={dreamTrips} />
            </div>
          </div>


          {/* User icon box */}
          <div id="user-icon-box">{/* Add your user icon here */}</div>

          {/* User followers */}
          <div className="following">
            <p>You are following</p>
            {user.following.map((followedUser) => (
            <Link to={`/public/${followedUser._id}`}>
            <div key={followedUser._id} className="follower-block">
              <p>Usename: {followedUser.username}</p>          
            </div>
            </Link>
            ))}
          </div>

        </div>
      </main>
    </div>
  );
};

export default Profile;
