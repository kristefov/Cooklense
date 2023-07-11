import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Table } from "react-bootstrap";

import { recipeSearch } from "../../utils/API";

const SingleRecipe = () => {
  const { id } = useParams();
  const storedData = localStorage.getItem("searchedMeals");
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);

  useEffect(() => {
    if (!storedData) {
      const fetchData = async () => {
        try {
          const response = await recipeSearch("searchById", id);
          
          const recipe = response && response.meals[0];
          console.log(selectedRecipe)

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
console.log(recipe)
          setSelectedRecipe(recipe);
          setIngredients(ingredients);
        } catch (error) {
          console.log(error);
        }
      };

      fetchData();
    } else {
      const recipes = JSON.parse(storedData);
      const recipe = recipes.find((item) => item.idMeal === id);
      const selectedRecipe = recipe && recipe.allData.meal;

      const ingredients = [];
      for (let i = 1; i <= 20; i++) {
        const ingredientKey = `strIngredient${i}`;
        const measureKey = `strMeasure${i}`;
        const ingredient = selectedRecipe[ingredientKey];
        const measure = selectedRecipe[measureKey];
        if (ingredient && ingredient.trim() !== "") {
          ingredients.push({ ingredient, measure });
        }
      }

      setSelectedRecipe(selectedRecipe);
      setIngredients(ingredients);
    }
  }, [id, storedData]);

  if (!storedData && !selectedRecipe) {
    return <div>no data</div>;
  }

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
