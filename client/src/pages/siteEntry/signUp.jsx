import { useState } from "react";
import Footer from "../../components/footer";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import "./signUp.css";
import mountains from "../../assets/mountains.png"; // Import the background image

const SignUp = () => {
  const [userFormState, setFormState] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [addUser] = useMutation(ADD_USER);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...userFormState,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      const { username, email, password } = userFormState;

      const { data } = await addUser({
        variables: { username, email, password },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="sign-up-page">
      {/* Background image */}
      <img src={mountains} alt="Mountains" className="bg" />
      <div className="sign-up-content">
        {/* Main header */}
        <h1 className="sign-up-header">Welcome to Nomad Notes!</h1>
        <div className="sign-up-box">
          <h4 className="sign-up-title">Sign Up</h4>
          <form onSubmit={handleFormSubmit}>
            <input
              className="sign-up-input"
              placeholder="Your username"
              name="username"
              type="text"
              value={userFormState.username}
              onChange={handleChange}
            />
            <input
              className="sign-up-input"
              placeholder="Your email"
              name="email"
              type="email"
              value={userFormState.email}
              onChange={handleChange}
            />
            <input
              className="sign-up-input"
              placeholder="******"
              name="password"
              type="password"
              value={userFormState.password}
              onChange={handleChange}
            />
            <button className="sign-up-button" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default SignUp;
