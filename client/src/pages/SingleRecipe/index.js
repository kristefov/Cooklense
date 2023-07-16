import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Table, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faList, faPlus, faCheck } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import { recipeSearch } from "../../utils/API";
import { useMutation, useQuery } from "@apollo/client";
import {
  ADD_TO_WEEKPLAN,
  SAVE_RECIPE,
  ADD_TO_SHOPPING_LIST,
} from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";
import { appendIngredients } from "../../utils/appendIngredients";

const weekDays = [
  { value: "MON", label: "Monday" },
  { value: "TUE", label: "Tuesday" },
  { value: "WED", label: "Wednesday" },
  { value: "THU", label: "Thursday" },
  { value: "FRI", label: "Friday" },
  { value: "SAT", label: "Saturday" },
  { value: "SUN", label: "Sunday" },
];

const SingleRecipe = () => {
  const { id } = useParams();
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [ingredients, setIngredients] = useState([]);
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [saveRecipe] = useMutation(SAVE_RECIPE);
  const [addToDay] = useMutation(ADD_TO_WEEKPLAN);
  const [addToShoppingList] = useMutation(ADD_TO_SHOPPING_LIST);
  const { data } = useQuery(GET_ME);
  const [youTubeLink, setYouTubeLink] = useState();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await recipeSearch("searchById", id);
        const recipe = response && response.meals[0];
        let youTube = recipe.strYoutube;
        var youTubeEmbed = youTube.replace("watch?v=", "embed/");

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
        setYouTubeLink(youTubeEmbed);
      } catch {
        throw new Error("Failed to fetch recipe data");
      }
    };

    fetchData();
  }, [id]);

  const isRecipeSaved = data?.me?.savedRecipes.some(
    (recipe) => recipe.idMeal === selectedRecipe?.idMeal
  );

  const handleSaveRecipe = async () => {
    const { idMeal, strMeal, strMealThumb } = selectedRecipe;

    if (isRecipeSaved) {
      console.log(`Recipe with idMeal ${idMeal} is already saved.`);
      return;
    }

    try {
      await saveRecipe({
        variables: { recipeData: { idMeal, strMeal, strMealThumb } },
      });
    } catch (error) {
      throw new Error(error);
    }
  };

  const handleAddToDay = async (e) => {
    const choosenDay = e.target.value;
    const { idMeal, strMeal, strMealThumb } = selectedRecipe;

    console.log(idMeal, "\n", strMeal, "\n", strMealThumb);
    try {
      await addToDay({
        variables: {
          day: choosenDay,
          recipeData: { idMeal, strMeal, strMealThumb },
        },
      });
    } catch (error) {
      throw new Error(error);
    }
    return;
  };

  const handleAddToShoppingList = async () => {
    const updatedIngredientList = ingredients.map(({ measure, ingredient }) => `${measure} ${ingredient}`);
    console.log(updatedIngredientList)
    try {
      await addToShoppingList({
        variables: {
          ingredients: [...updatedIngredientList],
        },
      });
      console.log("Item added to shopping list");
    } catch (error) {
      console.error("Error adding item to shopping list:", error);
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
                    <Button onClick={handleAddToShoppingList}>
                      <FontAwesomeIcon icon={faList} /> Add to shopping list
                    </Button>
                    {isRecipeSaved ? (
                      <Button disabled variant="success">
                        <FontAwesomeIcon icon={faCheck} /> Recipe saved
                      </Button>
                    ) : (
                      <Button onClick={() => handleSaveRecipe()}>
                        <FontAwesomeIcon icon={faPlus} /> Add to collection
                      </Button>
                    )}
                    <div>
                      <select onChange={handleAddToDay}>
                        <option value="">Add to week plan</option>
                        {weekDays.map(({ value, label }) => (
                          <option key={value} value={value}>
                            {label}
                          </option>
                        ))}
                      </select>
                    </div>
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
          <Container>
            <Row>
              <Card className="border border-true">
                <div className="ratio ratio-16x9">
                  <iframe
                    src={`${youTubeLink}?autoplay=1&mute=1&loop=1&modestbranding=1`}
                    title="YouTube video"
                    allowFullScreen
                  ></iframe>
                </div>
              </Card>
            </Row>
          </Container>
        </Card>
      )}
    </Container>
  );
};

export default SingleRecipe;
