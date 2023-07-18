import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";
import { Container } from "react-bootstrap";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SingleRecipe from "./pages/SingleRecipe";
import SearchResults from "./pages/SearchResults";
import Collections from "./pages/Collections";

import Week from "./pages/Week";
import Profile from "./pages/Profile/Profile";
import ShoppingList from "./pages/ShoppingList";
import ProtectedRoute from "./components/ProtectedRoute";
// Construct our main GraphQL API endpoint
const httpLink = createHttpLink({
  uri: "/graphql",
});

// Construct request middleware that will attach the JWT token to every request as an `authorization` header
const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists
  const token = localStorage.getItem("id_token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  // Set up our client to execute the `authLink` middleware prior to making the request to our GraphQL API
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <>
        <Container className="header">
          <Navbar />
          <Container
            className="d-flex py-0 align-items-center"
            style={{ minHeight: "760px" }}
          >
            <Routes>
              <Route path="/" Component={Home} />
              <Route path="/recipe/:id" Component={SingleRecipe} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/search/:searchType/:searchValue"
                Component={SearchResults}
              />
              <Route
                path="/collections"
                element={
                  <ProtectedRoute>
                    <Collections />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/week"
                element={
                  <ProtectedRoute>
                    <Week />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/list"
                element={
                  <ProtectedRoute>
                    <ShoppingList />
                  </ProtectedRoute>
                }
              />
              <Route element={<h1 className="display-2">Wrong page!</h1>} />
            </Routes>
          </Container>
        </Container>
      </>

      <Footer />
    </ApolloProvider>
  );
}

export default App;
