import React from "react"; // Import React for using JSX
import Footer from "../../components/footer"; // Import Footer component for the page footer
import "./login.css"; // Import CSS for styling the login page
import baobabs from "../../assets/baobabs.png"; // Import background image for the login page
import { useState } from "react"; // Import useState hook for managing local state
import Auth from "../../utils/auth"; // Import authentication utility for managing user sessions
import { useMutation } from "@apollo/client"; // Import useMutation hook for GraphQL mutations
import { LOGIN_USER } from "../../utils/mutations"; // Import GraphQL mutation for user login

function Login() {
  // Initialize form state with username and password fields
  const [userFormState, setFormState] = useState({
    username: "",
    password: "",
  });

  // Define mutation hook for logging in users
  const [loginUser, { error, data }] = useMutation(LOGIN_USER);

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

      console.log(username, password); // Log form values for debugging

      // Perform the login mutation
      const { data } = await loginUser({
        variables: { username, password },
      });

      console.log(data); // Log response data for debugging

      // Save token to local storage and redirect user upon successful login
      Auth.login(data.loginUser.token);
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
