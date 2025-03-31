import { Outlet } from "react-router-dom"; // Import Outlet for rendering nested routes

import "./App.css"; // Import CSS for the application

// Main App component
function App() {
  return (

      <div>
        <Outlet /> {/* Render nested routes here */}
      </div>

  );
}

export default App; // Export the App component
