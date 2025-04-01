import React from "react";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"

function PublicUser () {
  const [user, setUser] = useState("");
  const { id } = useParams()

  useEffect(() => {
    const getUserProfile = async ()=> {
      
      console.log(id)

      try {
        const response = await fetch(`/api/users/${id}`, 
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json"
            }
          }
        )

        const data = await response.json()

        setUser(data)
      }
      catch (err) {
        console.log(err)
      }
    }
    getUserProfile()
  }, [])

console.log(user.trips)

  return (
    <div>
      {user && (
        <>
        <p>You have found {user.username}'s profile</p>
        <p>Number of Trips: {user.trips.length}</p>  
        </>     
      )}
    </div>



  )
}

export default PublicUser