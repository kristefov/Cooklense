import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./style.css";

const week = {
  MON: [
    {
      idMeal: 52795,
      strMeal: "Chicken Handi",
    },
    {
      idMeal: 4124,
      strMeal: "pierogi",
    },
  ],
  THU: [
    {
      idMeal: 5141,
      strMeal: "beef",
    },
  ],
};

const HorizontalScrollableWindow = () => {
  const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

  const [selectedDay, setSelectedDay] = useState(null);

  const handleMoveToDay = (mealId, targetDay) => {
    console.log(`Moving meal with id ${mealId} to ${targetDay}`);
  };

  const handleRemoveMeal = (mealId) => {
    console.log(`Removing meal with id ${mealId}`);
  };

  const mealItems = (meals, weekday) =>
    meals.map((meal) => (
      <div className="meal-item" key={meal.idMeal}>
        <Link
          to={`/recipe/${meal.idMeal}`}
          style={{ textDecoration: "none", color: "black" }}
          className="meal-link"
        >
          <p className="mt-1">{meal.strMeal}</p>
        </Link>

        <div className="meal-item-buttons">
          <Button
            variant="danger"
            onClick={() => handleRemoveMeal(meal.idMeal)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </Button>
          {/* <Button variant="primary" onClick={() => handleMoveToDay(meal.idMeal, weekday)}>
          <FontAwesomeIcon icon={faArrowRight} />
        </Button> */}
        </div>
      </div>
    ));

  const columns = weekdays.map((weekday, index) => (
    <div className="column" key={index}>
      <div className="column-header">{weekday}</div>
      <div className="card-content">
        {mealItems(week[weekday] || [], weekday)}
      </div>
    </div>
  ));

  return (
    <Container fluid>
      <div style={{ overflowX: "auto" }}>
        <div style={{ display: "flex" }}>{columns}</div>
      </div>
    </Container>
  );
};

export default HorizontalScrollableWindow;
