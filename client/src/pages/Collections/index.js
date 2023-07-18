import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GET_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Container, Row, Col, Image } from "react-bootstrap";
import RecipeCard from "../../components/RecipeCard";

const Collections = () => {
  const [userData, setUserData] = useState(null);
  const { data } = useQuery(GET_ME);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  if (!isLoggedIn) {
    return <div>You need to be logged in to view this page.</div>;
  }

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Container as="main" className="h-19 mb-5 px-5">
      <h3 className="text-center">Collections</h3>
      {userData.me.savedRecipes.length === 0 ? (
        <p className="text-center">Your don't have any saved recipes</p>
      ) : (
        <Row>
          <Col>
            <Row>
              {userData.me.savedRecipes.map((meal, i) => (
                <RecipeCard meal={meal} key={i} />
              ))}
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default Collections;
