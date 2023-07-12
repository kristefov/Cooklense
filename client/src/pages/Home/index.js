import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const options = [
  { value: "name", label: "Search by Name" },
  { value: "ingredient", label: "Search by Ingredient" },
];

const Home = () => {

  const [searchInput, setSearchInput] = useState("");
  const [dropdownValue, setDropdownValue] = useState(options[0].value);
  const [showAlert, setShowAlert] = useState(false);

  const handleAlertDismiss = () => {
    setShowAlert(false);
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
                  {options.map((option) => (
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
      </Container>
    </>
  );
};

export default Home;
