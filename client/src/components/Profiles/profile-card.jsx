import React from "react";
import { Link } from "react-router-dom";

function ProfileCard ({user}) {
  console.log(user)
  return (
    <Link to={`/public/${user._id}`}>
      <div className="card-container">
      <p>Username: {user.username} </p>
      <p>Number of trips: </p>
      </div>
    </Link>

  )
}

export default ProfileCard