import React, { useState } from "react";
import {
  Container,
  Col,
  Form,
  Row,
  Button,
  InputGroup,
  FormControl,
} from "react-bootstrap";
// to be added in form.control later
// {/* value={searchInput} */}
// {/* onChange={(e) => setSearchInput(e.target.value)} */}

const options = [
  { value: "", label: "Select" },
  { value: "option1", label: "Option 1" },
  { value: "option2", label: "Option 2" },
  { value: "option3", label: "Option 3" },
];

const Home = () => {
  const [searchInput, setSearchInput] = useState("");
  const [dropdownValue, setDropdownValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    // Perform search or any other action here
    console.log("Search input:", searchInput);
    console.log("Dropdown value:", dropdownValue);
  };

  return (
    <Container style={{ marginTop: "10vh" }}>
      <h1>Search for recipes!</h1>
      <Form onSubmit={handleSearch}>
        <Row>
          <Col xs={12} md={8}>
            <InputGroup>
              <FormControl
                name="searchInput"
                type="text"
                style={{ width: '50%' }}
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
      </Form>
    </Container>
  );
};

export default Home;
