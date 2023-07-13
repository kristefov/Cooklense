import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPlus } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { recipeSearch } from "../../utils/API";
import { useMutation, useQuery } from "@apollo/client";
import { SAVE_RECIPE } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";
import { appendIngredients } from "../../utils/appendIngredients";

const SingleRecipe = () => {
  const { id } = useParams();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [saveRecipe] = useMutation(SAVE_RECIPE);
  const { data } = useQuery(GET_ME);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await recipeSearch("searchById", id);
        const recipe = response && response.meals[0];

        const ingredients = [];
        for (let i = 1; i <= 20; i++) {
          const ingredientKey = `strIngredient${i}`;
          const measureKey = `strMeasure${i}`;
          const ingredient = recipe[ingredientKey];
          const measure = recipe[measureKey];
          if (ingredient && ingredient.trim() !== "") {
            ingredients.push({ ingredient, measure });
          }
        }

        const recipeWithIngredients = appendIngredients([recipe])[0];

        setSelectedRecipe(recipeWithIngredients);
        setIngredients(ingredients);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [id]);

  const handleSaveRecipe = async () => {
    const { idMeal, strMeal, strMealThumb } = selectedRecipe;
    
    const isRecipeSaved = data.me.savedRecipes.some(recipe => recipe.idMeal === idMeal);
    if (isRecipeSaved) {
      console.log(`Recipe with idMeal ${idMeal} is already saved.`);
      return;
    }

    try {
      const { data } = await saveRecipe({
        variables: { recipeData: { idMeal, strMeal, strMealThumb } },
      });

    } catch (error) {
      throw new error();
    }
  };

  return (
    <Container className="my-4">
      {selectedRecipe && (
        <Card>
          <Row>
            <Col md={4}>
              <Card.Img
                variant="top"
                src={selectedRecipe.strMealThumb}
                alt={selectedRecipe.strMeal}
              />
            </Col>
            <Col md={8}>
              <Card.Body>
                <Card.Title>{selectedRecipe.strMeal}</Card.Title>
                {isLoggedIn && (
                  <>
                    <Button>
                      <FontAwesomeIcon icon={faList} /> Add to shopping list
                    </Button>
                    <Button onClick={() => handleSaveRecipe()}>
                      <FontAwesomeIcon icon={faPlus} /> Add to collection
                    </Button>
                  </>
                )}
                <Table striped bordered>
                  <thead>
                    <tr>
                      <th>Ingredients</th>
                      <th>Measure</th>
                    </tr>
                  </thead>
                  <tbody>
                    {ingredients.map((ingredient, index) => (
                      <tr key={index}>
                        <td>{ingredient.ingredient}</td>
                        <td>{ingredient.measure}</td>
                      </tr>
                    ))}
                  </tbody>
                </Table>
              </Card.Body>
            </Col>
          </Row>
          <Card.Footer>
            <small className="text-muted">
              {selectedRecipe.strInstructions}
            </small>
          </Card.Footer>
        </Card>
      )}
    </Container>
  );
};

export default SingleRecipe;
