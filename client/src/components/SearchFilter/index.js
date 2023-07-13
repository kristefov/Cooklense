import React from "react";
import { Container, Form } from "react-bootstrap";

const options = {
  general: {
    sugar: "Sugar",
    egg: "Eggs",
    flour: "Flour",
    nut: "Nuts",
  },
  dairy: {
    milk: "Milk",
    butter: "Butter",
    cream: "Cream",
    parmesan: "Parmesan",
    gruyere: "Gruyere",
    cheddar: "Cheddar",
  },
  meatFish: {
    pork: "Pork",
    chicken: "Chicken",
    prawn: "Prawn",
    duck: "Duck",
    prosciutto: "Prosciutto",
    salmon: "Salmon",
  },
  vegetables: {
    onion: "Onion",
    broccoli: "Broccoli",
    pepper: "Pepper",
    tomatoes: "Tomaotes",
    ginger: "Ginger",
    garlic: "Garlic",
    potatoes: "Potatoes",
    leek: "Leek",
  },
};

const SearchFilter = ({ onChange, onClick }) => {
    
  return (
    <Container>
      <Form onChange={onChange}>
        <Form.Label>This Product Contains:</Form.Label>
        {Object.keys(options.general).map((key) => (
          <Form.Check
            key={key}
            type="checkbox"
            name={key}
            label={options.general[key]}
            onClick={onClick}
          />
        ))}

        <Form.Label>Dairy products</Form.Label>
        {Object.keys(options.dairy).map((key) => (
          <Form.Check
            key={key}
            type="checkbox"
            name={key}
            label={options.dairy[key]}
            onClick={onClick}
          />
        ))}

        <Form.Label>Meat & Fish</Form.Label>
        {Object.keys(options.meatFish).map((key) => (
          <Form.Check
            key={key}
            type="checkbox"
            name={key}
            label={options.meatFish[key]}
            onClick={onClick}
          />
        ))}

        <Form.Label>Vegetables</Form.Label>
        {Object.keys(options.vegetables).map((key) => (
          <Form.Check
            key={key}
            type="checkbox"
            name={key}
            label={options.vegetables[key]}
            onClick={onClick}
          />
        ))}
      </Form>
    </Container>
  );
};

export default SearchFilter;
