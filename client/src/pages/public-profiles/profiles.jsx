import React from "react";
import { useState, useEffect } from 'react'
import natl_park from "../../assets/natl_park.png";
import Header from "../../components/header";
import ProfileCard from '../../components/Profiles/profile-card'
import "./public-profiles.css";

function PublicProfiles () {
  const [users, setUsers] = useState([])


  useEffect(() => {
    const getUsersData = async () => {
      try {
        const response = await fetch('/api/users',
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer token"
            }
          }
        )

        
        const data = await response.json()
        setUsers(data)
      }      
      catch (err) {
        console.log(err)
      }
    }
    getUsersData()
  }, [])
  
  return (
    <div>
    <Header />

    <main id="public-profiles">
      <img src={natl_park} alt="Northern lights" className="profileBg"></img>
      <div className="profile-cards">
      {users.map((user) => { 
        return (
          <ProfileCard
          key={user._id}
          user={user}
          />
        )        
      })}

      </div>

    </main>
    
    </div>
  )
}

export default PublicProfiles