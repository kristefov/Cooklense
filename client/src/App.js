import {
  ApolloClient,
  ApolloProvider,
  InMemoryCache,
  createHttpLink,
} from "@apollo/client";
import { setContext } from "@apollo/client/link/context";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import {
  Route,
  BrowserRouter as Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import BreadCrumbsiteComponent from "./components/BreadCrumbs";
import Footer from "./components/Footer";
import Navbar from "./components/Navbar";
import Collections from "./pages/Collections";
import Home from "./pages/Home";
import Profile from "./pages/Profile/Profile";
import SearchResults from "./pages/SearchResults";
import SingleRecipe from "./pages/SingleRecipe";
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
          <Route element={<h1 className="display-2">Wrong page!</h1>} />
        </Routes>
      </>

      <Footer />
    </ApolloProvider>
  );
}

export default App;
