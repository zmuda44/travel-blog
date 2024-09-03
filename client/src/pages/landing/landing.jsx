import useState from "react"; // Import useState hook from React (note: this should be `import { useState } from "react";`)
import { Link } from "react-router-dom"; // Import Link component for navigation between routes
import Footer from "../../components/footer"; // Import the Footer component
import { useQuery } from "@apollo/client"; // Import useQuery hook for GraphQL queries (currently not used)
// import { GET_ME } from "../../utils/queries"; // Uncomment to use the GET_ME query
import "./landing.css"; // Import CSS file for styling the landing page
import landingbg from "../../assets/landingbg.png"; // Import background image for the landing page

const Landing = () => {
  return (
    <div>
      <main id="landing-page">
        {/* Display the background image for the landing page */}
        <img src={landingbg} alt="Palm trees" className="bg" />
        <div style={{ textAlign: "center" }}>
          {/* Main heading of the landing page */}
          <h1>Nomad Notes</h1>
          {/* Subheading with a tagline */}
          <p>Wander the World, Share your Stories</p>
          {/* Navigation links for Log In and Sign Up */}
          <Link to="/login" className="btn btn-primary btn-lg">
            Log In
          </Link>
          <Link to="/signup" className="btn btn-primary btn-lg">
            Sign Up
          </Link>
        </div>
      </main>

      <footer>
        {/* Render the Footer component at the bottom of the page */}
        <Footer />
      </footer>
    </div>
  );
};

export default Landing;
