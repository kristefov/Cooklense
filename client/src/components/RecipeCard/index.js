import React, { useEffect, useState } from "react";
import { Col, Card, Modal, Button } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { GET_ME } from "../../utils/queries";
import { useMutation, useQuery } from "@apollo/client";
import { REMOVE_RECIPE } from "../../utils/mutations";

const RecipeCard = ({ meal }) => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const { data, loading } = useQuery(GET_ME);
  const [removeRecipe] = useMutation(REMOVE_RECIPE);
  const [userRecipes, setUserRecipes] = useState();
  const [showModal, setShowModal] = useState(false);
  const recipeSaved = data?.me?.savedRecipes;
  const location = useLocation();
  const path =
    location.pathname === "/profile" || location.pathname === "/collections";

  useEffect(() => {
    setUserRecipes(data?.me?.savedRecipes);
  }, [data]);

  const deleteRecipe = async (idMeal) => {
    console.log(idMeal);
    if (!isLoggedIn) {
      return false;
    }
    try {
      await removeRecipe({
        variables: { idMeal: idMeal },
      });
      const updated = userRecipes.filter((recipe) => recipe.idMeal !== idMeal);
      setUserRecipes(updated);
      console.log(updated);
    } catch (error) {
      console.error(error);
    }
  };
  if (loading) {
    return <h2>Loading...</h2>;
  }

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
        <Card>
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
          <Card>
            {path ? (
              <Button
                className="btn-block btn-danger"
                onClick={() => deleteRecipe(meal.idMeal)}
              >
                X
              </Button>
            ) : null}
          </Card>
        </Card>
      </Col>

      {isLoggedIn ? null : (
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Acces Denied</Modal.Title>
          </Modal.Header>
          <Modal.Body>Please log in to view the recipe details.</Modal.Body>
          <Modal.Footer>
            <Button
              variant="secondary"
              key={meal.idMeal}
              onClick={handleCloseModal}
            >
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      )}
    </>
  );
};

export default RecipeCard;
