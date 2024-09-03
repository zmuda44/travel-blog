import React from "react";
import ReactDOM from "react-dom/client"; // Import ReactDOM to render the React app
import { createBrowserRouter, RouterProvider } from "react-router-dom"; // Import routing components
import App from "./App.jsx"; // Import the main App component
import Landing from "./pages/landing/landing.jsx"; // Import the Landing page component
import DreamTrips from "./pages/trips/dreamTrips.jsx"; // Import the DreamTrips page component
import IndividualTrip from "./pages/trips/individualTrip.jsx"; // Import the IndividualTrip page component
import Login from "./pages/siteEntry/login.jsx"; // Import the Login page component
import PreviousTrips from "./pages/trips/previousTrips.jsx"; // Import the PreviousTrips page component
import Profile from "./pages/profile/profile.jsx"; // Import the Profile page component
import SignUp from "./pages/siteEntry/signUp.jsx"; // Import the SignUp page component
import UpcomingTrips from "./pages/trips/upcomingTrips.jsx"; // Import the UpcomingTrips page component
import "./index.css"; // Import the global CSS for the application

// Create a router with routes and their corresponding components
const router = createBrowserRouter([
  {
    path: "/", // Base path for the application
    element: <App />, // Main component that wraps all routes
    errorElement: <h1>Wrong page!</h1>, // Error page for non-existent routes
    children: [
      {
        index: true, // Default route when the base path is accessed
        element: <Landing />, // Component rendered at the base path
      },
      {
        path: "/dreamtrips", // Path for the DreamTrips page
        element: <DreamTrips />, // Component rendered for DreamTrips
      },
      {
        path: "/individualtrip", // Path for the IndividualTrip page
        element: <IndividualTrip />, // Component rendered for IndividualTrip
      },
      {
        path: "/login", // Path for the Login page
        element: <Login />, // Component rendered for Login
      },
      {
        path: "/previoustrips", // Path for the PreviousTrips page
        element: <PreviousTrips />, // Component rendered for PreviousTrips
      },
      {
        path: "/profile", // Path for the Profile page
        element: <Profile />, // Component rendered for Profile
      },
      {
        path: "/signup", // Path for the SignUp page
        element: <SignUp />, // Component rendered for SignUp
      },
      {
        path: "/upcomingtrips", // Path for the UpcomingTrips page
        element: <UpcomingTrips />, // Component rendered for UpcomingTrips
      },
    ],
  },
]);

// Render the application to the root element
ReactDOM.createRoot(document.getElementById("root")).render(
  <RouterProvider router={router} /> // Provide the router to the application
);