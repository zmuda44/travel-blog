import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Auth from "../../utils/auth";
import Header from "../../components/header";
import "./public-profiles.css";

function PublicUser() {
  const [user, setUser] = useState("");
  const [me, setMe] = useState("");
  const [followed, setFollowed] = useState(false);
  const { id } = useParams();

  let token = Auth.getToken();

  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const response = await fetch(`/api/users/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        const data = await response.json();

        setUser(data);
      } catch (err) {
        console.log(err);
      }
    };

    const getMyProfile = async () => {
      try {
        const response = await fetch("/api/users/me", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();

        setMe(data);
      } catch (err) {
        console.log(err);
      }
    };

    getUserProfile();
    getMyProfile();
  }, [id, token]);

  async function toggleFollowUser() {
    const isFollowing = me.following.some(
      (followedUser) => followedUser._id === user._id
    );

    try {
      let response;

      if (!isFollowing) {
        response = await fetch(`/api/users/${id}/follow`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      } else {
        console.log("delete request")
        response = await fetch(`/api/users/${id}/unfollow`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
      }

      const data = await response.json()
      
      window.location.reload()

    } catch (err) {
      console.log(err);
    }
  }

  return (
    <div>
      <div>
        <Header />
      </div>
      {user && (
        <>
          <div className="user-info">
            <p>You have found {user.username}'s profile</p>
            <p>Number of Trips: {user.trips.length}</p>
            {me && (
              <button onClick={toggleFollowUser}>
                {me.following.some((followedUser) => followedUser._id === user._id)
                  ? "Unfollow"
                  : "Follow"}
              </button>
            )}
          </div>

          <div className="friends-block"></div>
        </>
      )}
    </div>
  );
}

export default PublicUser;