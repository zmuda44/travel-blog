import React from "react";
import { useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import Auth from "../../utils/auth";

function PublicUser () {
  const [user, setUser] = useState("");
  const [me, setMe] = useState("")
  const [followed, setFollowed] = useState(false)
  const { id } = useParams()

  let token = Auth.getToken()

  useEffect(() => {
    const getUserProfile = async ()=> {

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

    const getMyProfile = async () => {
      console.log(token)
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
              
        setMe(data)
      }
      catch (err) {
        console.log(err)
      }
    }
    getUserProfile()
    getMyProfile()
  }, [])

  async function toggleFollowUser () {   
      try {
        if (!followed) {
        const response = await fetch(`/api/users/${id}/follow`, 
          {
            method: "POST",
            headers: {"Content-Type": "application/json", 'Authorization': `Bearer ${token}`},           
          }
        )
        }
        else {
          const response = fetch(`/api/users/${id}/follow`, 
            {
              method: "DELETE",
              headers: {"Content-Type": "application/json", 'Authorization': `Bearer ${token}`},           
            }
          )
        }
      }
      catch (err) {
        console.log(error)
      }

    setFollowed(!followed)
  }
  
  return (
    <div>
      {user && (
        <>
        <div className="user-info">
          <p>You have found {user.username}'s profile</p>
          <p>Number of Trips: {user.trips.length}</p> 
        </div>

        <div className="friends-block">
          {me && (
            followed == true ? <button onClick={toggleFollowUser}>Follow</button> : 
            <button onClick={toggleFollowUser}>Unfollow</button>
          )}
        </div> 
        </>     
      )}
    </div>
  )
}

export default PublicUser