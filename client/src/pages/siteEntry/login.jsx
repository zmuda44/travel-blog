import React from "react"; // Import React for using JSX
import Footer from "../../components/footer"; // Import Footer component for the page footer
import "./login.css"; // Import CSS for styling the login page
import baobabs from "../../assets/baobabs.png"; // Import background image for the login page
import { useState } from "react"; // Import useState hook for managing local state
import Auth from "../../utils/auth"; // Import authentication utility for managing user sessions

function Login() {
  // Initialize form state with username and password fields
  const [userFormState, setFormState] = useState({
    username: "",
    password: "",
  });

  // Handle changes in form input fields
  const handleChange = (event) => {
    const { name, value } = event.target;

    // Update state with new values from form inputs
    setFormState({
      ...userFormState,
      [name]: value,
    });
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault(); // Prevent default form submission behavior

    try {
      const { username, password } = userFormState;

      const response = await fetch("/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })

      const data = await response.json() // Log response data for debugging
      
      if (!data.user) {
        console.log(data)
      }      

      // Save token to local storage and redirect user upon successful login
      Auth.login(data.token, data.user.username);
      window.location.assign('/profile');
    } catch (e) {
      console.error(e); // Log errors if login fails
    }

    // Clear form fields after submission
    setFormState({
      username: "",
      password: "",
    });
  };

  return (
    <div className="login-page">
      <img src={baobabs} alt="Baobabs" className="bg" />
      <div className="login-content">
        <h1 className="login-header">Welcome Back!</h1>
        {/* <p className="login-subheader">Your Gateway to the World</p> */}
        <div className="login-box">
          <h2 className="login-title">Login</h2>
          <form onSubmit={handleFormSubmit}>
            <input
              type="text"
              placeholder="Username"
              name="username"
              required
              value={userFormState.username}
              onChange={handleChange}
              className="login-input"
            />
            <input
              type="password"
              placeholder="Password"
              name="password"
              required
              value={userFormState.password}
              onChange={handleChange}
              className="login-input"
            />
            <button type="submit" className="login-button">
              Away we go!
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
}

export default Login;
