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
import { text } from "@fortawesome/fontawesome-svg-core";

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
    <Container as="main" className="h-100 mt-5 mb-5 px-5">
      <h1 className="text-center"> Search for recipes!</h1>
      <Container
        className="justify-content-center align-items-center h-100"
        style={{ marginTop: "10vh", height: "50vh" }}
      >
        <Form>
          <Row>
            <Row xs={12} md={8}>
              <InputGroup>
                <FormControl
                  name="searchInput"
                  type="text"
                  style={{ width: "60%" }}
                  size="lg"
                  placeholder="Search for a recipe"
                  value={searchInput}
                  onChange={(e) => setSearchInput(e.target.value)}
                />
                <Link to={`/search/${dropdownValue}/${searchInput}`}>
                  <Button type="submit" size="lg">
                    Search
                  </Button>
                </Link>
              </InputGroup>
              <InputGroup>
                <Form.Select
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
                </Form.Select>
                <Form.Select
                  aria-label="Floating label select example"
                  value={selectedCountry}
                  onChange={handleCountryChange}
                >
                  <option value="">Select a cuisine</option>
                  {allCountries.map((country, index) => (
                    <option key={index} value={country.strArea}>
                      {country.strArea}
                    </option>
                  ))}
                </Form.Select>

                <Form.Select
                  aria-label="Floating label select example"
                  value={selectedCategory}
                  onChange={handleCategoryChange}
                >
                  <option value="">Select a category</option>
                  {allCategories.map((category, index) => (
                    <option key={index} value={category.strCategory}>
                      {category.strCategory}
                    </option>
                  ))}
                </Form.Select>
              </InputGroup>
            </Row>
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
      </Container>
    </>
  );
};

export default Home;
