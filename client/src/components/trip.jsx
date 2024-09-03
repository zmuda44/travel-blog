import React from 'react';

const Trip = ({ location, date }) => {
    return (
        // Render a card representing a trip
        <div className="trip-card">
            {/* Display the location of the trip */}
            <h2>{location}</h2>
            {/* Display the date of the trip */}
            <p>{date}</p>
        </div>
    );
};

export default Trip;
