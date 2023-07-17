import { useQuery } from "@apollo/client";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { GET_ME } from "../../utils/queries";
import { logout } from "../../reducers/authReducer";
import { useDispatch } from "react-redux";

const ProtectedRoute = ({ children }) => {
  const { error, refetch } = useQuery(GET_ME);
  const auth = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    refetch?.();
    console.log("Refetching");
    return () => refetch?.();
  }, [refetch]);
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
  useEffect(() => {
    if (!auth.isLoggedIn) {
      navigate("/");
    }
  }, [auth, navigate]);

  return children;
};

export default ProtectedRoute;
