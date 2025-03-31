import React from "react";

function ProfileCard ({user}) {
  console.log(user)
  return (
    <div>{user.username}</div>
  )
}

export default ProfileCard