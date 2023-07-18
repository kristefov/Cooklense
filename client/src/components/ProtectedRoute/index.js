// Import necessary dependencies and components
import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_ME } from "../../utils/queries";
import { logout } from "../../reducers/authReducer";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { error, refetch } = useQuery(GET_ME);// Apollo client hook for making a query to fetch user data
  const auth = useSelector((state) => state.auth); // Access auth state from Redux store
  const navigate = useNavigate();// React Router hook for navigation
  const dispatch = useDispatch();// Redux hook for dispatching actions

// useEffect to refetch user data and clean up before unmounting
  useEffect(() => {
    refetch?.();
    console.log("Refetching");
    return () => refetch?.();
  }, [refetch]);
  // useEffect to handle error and logout if UNAUTHENTICATED error occurs
  useEffect(() => {
    console.dir(error);
    if (!error || error.networkError) {
      return;
    }
    const UNAUTHENTICATED = error.graphQLErrors?.some(
      (graphqlError) => graphqlError.extensions.code === "UNAUTHENTICATED"
    );
    if (!UNAUTHENTICATED) {
      return;
    }
    console.log("logingout");
    dispatch(logout());
  }, [error, dispatch]);
  // useEffect to redirect to home page if user is not logged in
  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/");
    }
  }, [auth, navigate]);


  return children;// Render the protected route component and its children
};


export default ProtectedRoute;
