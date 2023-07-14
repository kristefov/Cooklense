import React from "react";
import { GET_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";
import { Container, Row, Col, Image } from "react-bootstrap";
import RecipeCard from "../../components/RecipeCard";

const Collections = () => {
  const { data } = useQuery(GET_ME);
  console.log(data.me.savedRecipes);
  return (
    <Container>
      <Row>
        <Col sm={2} className="text-center">
          {data.avatar ? (
            <Image src={data.avatar} rounded className="img-fluid" />
          ) : (
            <Image src="avatar.png" rounded className="img-fluid" />
          )}
          <p className="mt-3">{data.me.username}</p>
        </Col>
        <Col>
          <Row>
            {data.me.savedRecipes.map((meal) => (
              <RecipeCard meal={meal} />
            ))}
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default Collections;
