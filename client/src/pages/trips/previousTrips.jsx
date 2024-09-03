import React from 'react'; // Import React library
import Header from '../../components/header'; // Import Header component for page header
import Footer from '../../components/footer'; // Import Footer component for page footer
import './trips.css'; // Import CSS for styling the PreviousTrips page
// import { useQuery } from '@apollo/client'; // Import useQuery hook to execute GraphQL queries
// import { GET_USER_TRIPS } from '../../graphql/queries'; // Import GraphQL query to get user trips
// import Trip from '../../components/trip'; // Import Trip component to display trip details

const PreviousTrips = () => {
    // Execute the GET_USER_TRIPS query to fetch the user's trips
    const { loading, error, data } = useQuery(GET_USER_TRIPS);

    // Display loading state while data is being fetched
    if (loading) return <p>Loading...</p>;
    
    // Display error message if there is an issue with the query
    if (error) return <p>Error: {error.message}</p>;

    // Get the current date
    const currentDate = new Date();

    // Filter trips to include only those with a date before the current date
    const previousTrips = data.userTrips.filter(trip => new Date(trip.date) < currentDate);

    return (
        <div>
            {/* Render the Header component */}
            <Header />
            
            {/* Map through previousTrips and render a Trip component for each trip */}
            {previousTrips.map(trip => (
                <Trip key={trip.id} trip={trip} /> // Pass trip data as a prop to the Trip component
            ))}
            
            {/* Render the Footer component */}
            <Footer />
        </div>
    );
};

export default PreviousTrips; // Export PreviousTrips component for use in other parts of the application
