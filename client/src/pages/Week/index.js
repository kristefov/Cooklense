import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { GET_ME } from "../../utils/queries";
import { useQuery } from "@apollo/client";

const WeekPlan = () => {
  const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const { data } = useQuery(GET_ME);
  const [savedWeekPlan, setSavedWeekPlan] = useState([]);

  useEffect(() => {
    if (data && data.me && data.me.weekPlan) {
      setSavedWeekPlan(data.me.weekPlan);
    }
  }, [data]);


  const handleRemoveMeal = (mealId) => {
    console.log(`Removing meal with id ${mealId}`);
  };

  const mealItems = (meals) =>
  meals.map((meal, index) => (
    <div className="meal-item" key={index}>
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
      </div>
    </div>
  ));


  const columns = weekdays.map((weekday, index) => {
    const mealsByDay = savedWeekPlan.filter((meal) => meal.day === weekday).flatMap((meal) => meal.recipeData);
    return (
      <div className="column" key={index}>
        <div className="column-header">{weekday}</div>
        <div className="card-content">
          {mealsByDay.length > 0 && mealItems(mealsByDay)}
        </div>
      </div>
    );
  });

  return (
    <Container fluid>
      <div style={{ overflowX: "auto" }}>
        <div style={{ display: "flex" }}>{columns}</div>
      </div>
    </Container>
  );
};

export default WeekPlan;
