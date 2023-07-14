import React, { useState } from "react";
import { Col, Card, Modal, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

const RecipeCard = ({ meal }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [showModal, setShowModal] = useState(false);

  const handleCloseModal = () => {
    setShowModal(false);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleClick = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      handleOpenModal();
    }
  };

  return (
    <>
      <Col md="4" key={meal.idMeal} className="mb-4">
        <Link
          to={`/recipe/${meal.idMeal}`}
          style={{ textDecoration: "none", color: "inherit" }}
          onClick={handleClick}
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

      {isLoggedIn ? null : (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Acces Denied</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please log in to view the recipe details.</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default RecipeCard;
