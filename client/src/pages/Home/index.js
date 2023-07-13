import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getCategories, getCountries } from "../../utils/API";

import {
  Container,
  Col,
  Form,
  Row,
  Button,
  InputGroup,
  FormControl,
  Alert,
} from "react-bootstrap";

const mainSearchOptions = [
  { value: "name", label: "Search by Name" },
  { value: "ingredient", label: "Search by Ingredient" },
];

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [dropdownValue, setDropdownValue] = useState(
    mainSearchOptions[0].value
  );
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [allCountries, setAllCountries] = useState([]);
  const [allCategories, setAllCategories] = useState([]);
  const navigate = useNavigate();
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    getCountries().then((countries) => {
      setAllCountries(countries);
    });
  }, []);

  useEffect(() => {
    getCategories().then((categories) => {
      setAllCategories(categories);
    });
  }, []);

  const handleAlertDismiss = () => {
    setShowAlert(false);
  };

  const handleCountryChange = (e) => {
    const selectedCountry = e.target.value;
    setSelectedCountry(selectedCountry);
    if (selectedCountry !== "") {
      navigate(`/search/cuisine/${selectedCountry}`);
    }
  };

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setSelectedCategory(selectedCategory);
    if (selectedCategory !== "") {
      navigate(`/search/category/${selectedCategory}`);
    }
  };

  return (
    <>
      <Container style={{ marginTop: "10vh" }}>
        <h1>Search for recipes!</h1>
        <Form>
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
                  {mainSearchOptions.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </Form.Control>
              </InputGroup>
            </Col>
            <Col xs={12} md={4}>
              <Link to={`/search/${dropdownValue}/${searchInput}`}>
                <Button type="submit" size="lg">
                  Search
                </Button>
              </Link>
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
        <Row>
          <Col xs={12} md={8}>
            <div>
              <select value={selectedCountry} onChange={handleCountryChange}>
                <option value="">Select a cuisine</option>
                {allCountries.map((country, index) => (
                  <option key={index} value={country.strArea}>
                    {country.strArea}
                  </option>
                ))}
              </select>

              <select value={selectedCategory} onChange={handleCategoryChange}>
                <option value="">Select a category</option>
                {allCategories.map((category, index) => (
                  <option key={index} value={category.strCategory}>
                    {category.strCategory}
                  </option>
                ))}
              </select>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Home;
