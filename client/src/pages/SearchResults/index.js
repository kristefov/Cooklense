import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Card, Spinner, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

import { recipeSearch } from "../../utils/API";

const SearchResults = () => {
  const { searchType, searchValue } = useParams();
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getSearchData = async () => {
      try {
        const { meals } = await recipeSearch(searchType, searchValue);
        setSearchResults(meals);
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };

    getSearchData();
  }, [searchType, searchValue]);

  if (loading) {
    return <Spinner animation="border" variant="primary" />;
  }

  if (!searchResults) {
    return (
        <Container className="d-flex justify-content-center align-items-start mt-5">
          <h3>No results found for {searchValue}</h3>
          <Link to="/">
            <Button variant="primary">
              Go Back
            </Button>
          </Link>
      </Container>
    );
  }

  return (
    <Container>
      <h2 className="pt-5">
        {searchResults.length ? `Viewing ${searchResults.length} results:` : ""}
      </h2>
      <Row>
        {searchResults.map((meal) => {
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
  );
};

export default SearchResults;
