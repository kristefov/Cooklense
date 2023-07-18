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
  FloatingLabel,
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
      <Container
        as="main"
        className="h-100 mb-5 d-flex flex-wrap justify-content-center mt-5 px-5"
      >
        <Container
          className="justify-content-center align-items-center h-90"
          style={{ marginTop: "10vh", height: "50vh" }}
        >
          <h1 className="text-center"> Search for recipes!</h1>
          <Form>
            <Row>
              <Row xs={12} md={8}>
                <FloatingLabel
                  controlId="searchInput"
                  label="Select a filter"
                  className="mb-3 d-flex secrettodo col-3 p-0"
                >
                  <Form.Select
                    size="lg"
                    className="form-select form-select-lg text-black"
                    style={{ color: "black", height: "100%" }}
                    value={dropdownValue}
                    onChange={(e) => setDropdownValue(e.target.value)}
                  >
                    {mainSearchOptions.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </Form.Select>
                </FloatingLabel>
                <FloatingLabel
                  controlId="searchInput"
                  label="Search for a recipe"
                  className="mb-3 d-flex secrettodo col-9 p-0"
                >
                  <FormControl
                    name="searchInput"
                    type="text"
                    style={{ width: "80%", height: "100%" }}
                    size="lg"
                    placeholder="Search for a recipe"
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <Link
                    style={{ width: "20%", height: "100%" }}
                    type="submit"
                    size="lg"
                    className="btn btn-warning text-dark btn-lg rounded-0"
                    to={`/search/${dropdownValue}/${searchInput}`}
                  >
                    Search
                  </Link>
                </FloatingLabel>

                <InputGroup className="p-0">
                  <Form.Select
                    aria-label="Floating label select example"
                    value={selectedCountry}
                    onChange={handleCountryChange}
                    className="form-select form-select-lg text-black"
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
                    className="form-select form-select-lg text-black"
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
