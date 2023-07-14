import React, { useEffect, useState } from "react";
import { GET_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Container, Row, Col, Image } from "react-bootstrap";
import RecipeCard from "../../components/RecipeCard";

const Collections = () => {
  const [userData, setUserData] = useState(null);
  const { data } = useQuery(GET_ME);

  useEffect(() => {
    if (data) {
      setUserData(data);
    }
  }, [data]);

  if (!userData) {
    return <div>Loading...</div>;
  }

  return (
    <Container>
      <Row>
        <Col sm={2} className="text-center">
          {userData.avatar ? (
            <Image src={userData.avatar} rounded className="img-fluid" />
          ) : (
            <Image src="avatar.png" rounded className="img-fluid" />
          )}
          <p className="mt-3">{userData.me.username}</p>
        </Col>
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
