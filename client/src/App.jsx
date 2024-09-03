import { Outlet } from "react-router-dom"; // Import Outlet for rendering nested routes
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client"; // Import necessary Apollo Client components
import { setContext } from "@apollo/client/link/context"; // Import setContext for adding headers
import "./App.css"; // Import CSS for the application

// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql", // Set the URI of the GraphQL API
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // Return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "", // Add the token to the authorization header
    },
  };
});

// Create an instance of ApolloClient
const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink), // Chain authLink and httpLink together
  cache: new InMemoryCache(), // Initialize the cache
});

// Main App component
function App() {
  return (
    <ApolloProvider client={client}>
      <div>
        <Outlet /> {/* Render nested routes here */}
      </div>
    </ApolloProvider>
  );
}

export default App; // Export the App component
