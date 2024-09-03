import React from 'react'; // Import React library
import Header from '../../components/header'; // Import Header component for the page header
import Footer from '../../components/footer'; // Import Footer component for the page footer
import './trips.css'; // Import CSS for styling the DreamTrips page

const DreamTrips = () => {
    return (
        <div className="dream-trips">
            {/* Render the Header component */}
            <Header />
            
            {/* Container for friends section */}
            <div className="friends-box">
                <h2>Friends</h2>
                {/* Display friends here */}
                {/* This section can be used to list or display friends related to the dream trips */}
            </div>
            
            {/* Container for dream trips */}
            <div className="dream-trips-container">
                {/* Each div below represents a box for a dream trip */}
                <div className="dream-trip-box">
                    {/* Display dream trip 1 here */}
                    {/* This box can be used to display details of the first dream trip */}
                </div>
                <div className="dream-trip-box">
                    {/* Display dream trip 2 here */}
                    {/* This box can be used to display details of the second dream trip */}
                </div>
                <div className="dream-trip-box">
                    {/* Display dream trip 3 here */}
                    {/* This box can be used to display details of the third dream trip */}
                </div>
            </div>
            
            {/* Render the Footer component */}
            <Footer />
        </div>
    );
};

export default DreamTrips; // Export DreamTrips component for use in other parts of the application

