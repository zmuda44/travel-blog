import React from 'react';
import Header from '../../components/header';
import Footer from '../../components/footer';
import './trips.css';
import { useQuery } from '@apollo/client'; // Import useQuery for GraphQL queries
import { GET_USER_TRIPS } from '../../utils/queries'; // Import the query to fetch user trips
import UpcomingTripsComponent from '../../components/Trips/upcomingTrips'; // Import the upcoming trips component to display individual trips


const UpcomingTrips = () => { 
  return (
    <UpcomingTrips />    
  )
}

export default UpcomingTrips;








// const UpcomingTrips = () => {
//     // Fetch user trips using the GraphQL query
//     const { loading, error, data } = useQuery(GET_USER_TRIPS);

//     // Display a loading message while data is being fetched
//     if (loading) return <p>Loading...</p>;
    
//     // Display an error message if there is an issue with the query
//     if (error) return <p>Error: {error.message}</p>;

//     // Get the current date to filter trips
//     const currentDate = new Date();
    
//     // Filter trips to only include those that are in the future
//     const upcomingTrips = data.userTrips.filter(trip => new Date(trip.date) > currentDate);

//     return (
//         <div>
//             <Header /> {/* Render the header component */}
//             {/* Render a list of upcoming trips */}
//             {upcomingTrips.map(trip => (
//                 <Trip key={trip.id} trip={trip} /> // Render each trip using the Trip component
//             ))}
//             <Footer /> {/* Render the footer component */}
//         </div>
//     );
// };

// export default UpcomingTrips;

