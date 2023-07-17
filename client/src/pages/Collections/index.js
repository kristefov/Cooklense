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
    <Container as="main" className="h-100 mt-5 mb-5 px-5">
      <Row>
        {/* <Col sm={2} className="text-center">
          {userData.avatar ? (
            <Image src={userData.avatar} rounded className="img-fluid" />
          ) : (
            <Image src="avatar.png" rounded className="img-fluid" />
          )}
          <p className="mt-3">{userData.me.username}</p>
        </Col> */}
        <Col>
          <Row>
            {userData.me.savedRecipes.map((meal) => (
              <RecipeCard meal={meal} key={meal.id} />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Collections;
