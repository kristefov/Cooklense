import React from "react";
import { Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const RecipeCard = ({ meal }) => {
 
  return (
    <>
      <Col md="4" key={meal.idMeal} className="mb-4">
        <Link
          to={`/recipe/${meal.idMeal}`}
          style={{ textDecoration: "none", color: "inherit" }}
        >
          <Card key={meal.idMeal} border="dark">
            {meal.strMealThumb ? (
              <Card.Img
                src={`${meal.strMealThumb}/preview`}
                alt={`The picture for ${meal.strMeal}`}
                variant="top"
              />
            ) : null}

            <Card.Body>
              <Card.Title>{meal.strMeal}</Card.Title>
            </Card.Body>
          </Card>
        </Link>
      </Col>
    </>
  );
};

export default RecipeCard;
