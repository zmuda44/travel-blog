import React from "react";
import { Link, useLocation } from "react-router-dom";
import Auth from "../utils/auth";
import { useState, useEffect} from 'react'

const Header = () => {

  const [ currentPage, setCurrentPage ]  = useState("")

  const location = useLocation();

  useEffect(() => {
    // Check the current path and perform an action based on it
    if (location.pathname === "/profile") {
      setCurrentPage("Your Profile")
    }
    else if (location.pathname === "/public-profiles" || "/user-profile") {
      console.log("You're on Page B");
      // Another action can be added here
    } else if (location.pathname === "/pageC") {
      console.log("You're on Page C");
      // You can perform any action when you're on Page C
    }
  }, [location]);
  return (
    // Define the header section for the webpage
    <header>
      <Link to="/profile" className="brand-link">
        Your Profile
      </Link>
 
      <Link to="/public" className="brand-link">
        Public Profiles
      </Link>


      {/* Navigation section */}
      <nav>
        {/* Dropdown menu for exploration options */}
        <div className="dropdown">
          {/* Button that triggers the dropdown */}
          <button className="logout-button" onClick={Auth.logout}>
            Logout
          </button>
        </div>
      </nav>
    </header>
  );
};

export default Header;
