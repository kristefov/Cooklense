import React, { useState, useEffect } from "react";
import { recipeSearch } from "../../utils/API";
import { Link } from "react-router-dom";
import Collapse from 'react-bootstrap/Collapse';
import Fade from 'react-bootstrap/Fade';
import {
  Container,
  Col,
  Form,
  Row,
  Button,
  InputGroup,
  FormControl,
  Alert,
  Card,
  Breadcrumb

} from "react-bootstrap";

const options = [
  { value: "searchName", label: "Search by Name" },
  { value: "searchIngredient", label: "Search by Ingredient" },
  //   { value: "searchCategory", label: "Category" },
];

const useLocalStorageState = (key, defaultValue) => {
  const [state, setState] = useState(() => {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
};

const Home = () => {
  const [searchedMeals, setSearchedMeals] = useLocalStorageState(
    "searchedMeals",
    []
  );
  const [searchInput, setSearchInput] = useState("");
  const [dropdownValue, setDropdownValue] = useState("searchName");
  const [showAlert, setShowAlert] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();

    if (!searchInput || !dropdownValue) {
      setShowAlert(true);
    } else {
      console.log("Search input:", searchInput);
      console.log("Dropdown value:", dropdownValue);

      setSearchInput("");
      setDropdownValue("");

      try {
        const { meals } = await recipeSearch(dropdownValue, searchInput);

        const mealsData = meals.map((meal) => ({
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
          allData: { meal },
        }));
        console.log(mealsData);
        setSearchedMeals(mealsData);
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleAlertDismiss = () => {
    setShowAlert(false);
  };

  return (
    <>
            <Container fluid-direction='row'>
        <Breadcrumb separator={"-->"}>

          <Breadcrumb.Item href="/">
            Back to Search
          </Breadcrumb.Item>
          <Breadcrumb.Item active to={Link}>
           Result: Geeks for Geeks
          </Breadcrumb.Item>
        </Breadcrumb>
        </Container>
      <Container style={{ marginTop: "10vh" }}>
        <h1>Search for recipes!</h1>
        <Form onSubmit={handleSearch}>
          <Row>
            <Col xs={12} md={8}>
              <InputGroup>
                <FormControl
                  name="searchInput"
                  type="text"
                  style={{ width: "50%" }}
                  size="lg"
                  placeholder="Search for a recipe"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />

                <Form.Control
                  as="select"
                  size="lg"
                  style={{ color: "gray" }}
                  value={dropdownValue}
                  onChange={(e) => setDropdownValue(e.target.value)}
                >
                  {options.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </InputGroup>
            </Col>
            <Col xs={12} md={4}>
              <Button type="submit" size="lg">
                Search
              </Button>
            </Col>
          </Row>
          {showAlert && (
            <Alert
              variant="warning"
              className="mt-3"
              onClose={handleAlertDismiss}
              dismissible
            >
              Field cannot be empty.
            </Alert>
          )}
        </Form>
      </Container>

      <Container>
        <h2 className="pt-5">
          {searchedMeals.length
            ? `Viewing ${searchedMeals.length} results:`
            : ""}
        </h2>
        <Row>
          {searchedMeals.map((meal) => {
            return (
              <Col md="4" key={meal.idMeal} className="mb-4">
                <Link
                  to={`/recipe/${meal.idMeal}`}
                  style={{ textDecoration: "none", color: "inherit" }}
                >
                  <Card key={meal.idMeal} border="dark">
                    {meal.strMealThumb ? (
                      <Card.Img
                        src={meal.strMealThumb}
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
    </>
  );
};

export default Home;
