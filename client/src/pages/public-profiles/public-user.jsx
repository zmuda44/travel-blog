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

console.log(user)

  return (
    <div>You have found {user.username}'s profile</div>
  )
}

export default PublicUser