import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";
import { setContext } from "@apollo/client/link/context";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  createHttpLink,
} from "@apollo/client";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import SingleRecipe from "./pages/SingleRecipe";
import SearchResults from "./pages/SearchResults";
import Collections from "./pages/Collections";
import BreadCrumbsiteComponent from "./components/BreadCrumbs";
import Week from './pages/Week';
import Profile from "./pages/Profile/Profile";
import ShoppingList from './pages/ShoppingList';

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
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/");
    }
  }, []);

  return (
    <ApolloProvider client={client}>
      <>
        <Navbar />
        <BreadCrumbsiteComponent />
        <Routes>
          <Route path="/" Component={Home} />
          <Route path="/recipe/:id" Component={SingleRecipe} />
          <Route path="/profile" Component={Profile} />
          <Route
            path="/search/:searchType/:searchValue"
            Component={SearchResults}
          />
          <Route path="/collections" Component={Collections} />
          <Route path='/week' Component={Week} />
          <Route path='/list' Component={ShoppingList} />
          <Route element={<h1 className="display-2">Wrong page!</h1>} />
        </Routes>
      </>

      <Footer />
    </ApolloProvider>
  );
}

export default App;
