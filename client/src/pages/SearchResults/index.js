import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchFilter from "../../components/SearchFilter";
import { useMutation } from '@apollo/client'; 
import { recipeSearch } from "../../utils/API";
 
const SearchResults = () => {
  const { searchType, searchValue } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [checkedIngredients, setCheckedIngredients] = useState([]);
  const auth = useSelector(state => state.auth)
 
  useEffect(() => {
    const getSearchData = async () => {
      try {
        const { meals } = await recipeSearch(searchType, searchValue);
        let mealsWithIngredients = appendIngredients(meals);
        setSearchResults(mealsWithIngredients);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
 
    getSearchData();
  }, [searchType, searchValue]);
 
  const appendIngredients = (data) => {
    return data.map((meal) => {
      const ingredientNames = Object.keys(meal)
        .filter((key) => key.startsWith("strIngredient"))
        .map((key) => {
          const ingredient = meal[key];
          return ingredient ? ingredient.toLowerCase() : ingredient;
        })
        .filter((ingredient) => ingredient !== "");
 
      return {
        ...meal,
        ingredientNames: ingredientNames,
      };
    });
  };
 
  const handleFilterClick = (e) => {
    const ingredient = e.target.name;
    if (e.target.checked) {
      setCheckedIngredients([...checkedIngredients, ingredient]);
    } else {
      setCheckedIngredients(
        checkedIngredients.filter((item) => item !== ingredient)
      );
    }
  };
 
  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }
 
  const filteredResults = searchResults.filter((meal) => {
    return checkedIngredients.every((ingredient) =>
      meal.ingredientNames.some(
        (ingredientName) =>
          ingredientName && ingredientName.includes(ingredient.toLowerCase())
      )
    );
  });
 
  return (
    <Container>
      <Row>
        <Col sm={3}>
          <h2 className="pt-3">Options:</h2>
          <SearchFilter onClick={handleFilterClick} />
        </Col>
        <Col sm={9}>
          {filteredResults.length ? (
            <Container>
              <h2 className="pt-3">
                Viewing {filteredResults.length} results:
              </h2>
              <Row>
                {filteredResults.map((meal) => {
                  return (
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
                  );
                })}
              </Row>
            </Container>
          ) : (
            <Container className="d-flex justify-content-center align-items-start mt-5">
              <h3>No results for your selection</h3>
              <Link to="/">
                <Button variant="primary">Go Back</Button>
              </Link>
            </Container>
          )}
        </Col>
      </Row>
    </Container>
  );
};
 
export default SearchResults;