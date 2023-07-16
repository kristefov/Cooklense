import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import "./style.css";
import { GET_ME } from "../../utils/queries";
import { REMOVE_MEAL_FROM_WEEKPLAN } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

const WeekPlan = () => {
  const weekdays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];
  const [savedWeekPlan, setSavedWeekPlan] = useState([]);
  const { loading, data } = useQuery(GET_ME, { fetchPolicy: "network-only" });
  const [removeMealFromWeekPlan] = useMutation(REMOVE_MEAL_FROM_WEEKPLAN);

  useEffect(() => {
    if (!loading && data && data.me && data.me.weekPlan) {
      setSavedWeekPlan(data.me.weekPlan);
    }
  }, [loading, data]);

  const handleRemoveMeal = async (id) => {
    try {
      const res = await removeMealFromWeekPlan({
        variables: {
          _id: id,
        },
      });
      console.log(res.data.removeMealFromWeekPlan.weekPlan);
      // const updatedWeekPlan = savedWeekPlan.filter(
      //   (meal) => meal.idMeal !== idMeal
      // );
      // console.log(updatedWeekPlan);
      setSavedWeekPlan(res.data.removeMealFromWeekPlan.weekPlan);
    } catch (error) {
      console.log("Error removing meal:", error);
    }
  };

  const mealItems = (meals) =>
    meals.map((meal, index) => (
      <div className="meal-item" key={index}>
        <Link
          to={`/recipe/${meal.idMeal}`}
          style={{ textDecoration: "none", color: "black" }}
          className="meal-link"
        >
          <div>
            <p className="mt-1">{meal.strMeal}</p>
          </div>
        </Link>

        <div className="meal-item-buttons">
          <Button variant="danger" onClick={() => handleRemoveMeal(meal._id)}>
            <FontAwesomeIcon icon={faTimes} />
          </Button>
        </div>
      </div>
    ));

  const columns = weekdays.map((weekday, index) => {
    const mealsByDay = savedWeekPlan
      .filter((meal) => meal.day === weekday)
      .flatMap((meal) => meal.recipeData);
    return (
      <div className="column" key={index}>
        <div className="column-header">{weekday}</div>
        <div className="card-content">
          {mealsByDay.length > 0 && mealItems(mealsByDay)}
        </div>
      </div>
    );
  });

  if (loading) {
    return <p>Loading...</p>; // Render a loading indicator while data is being fetched
  }

  return (
    <Container fluid>
      <div style={{ overflowX: "auto" }}>
        <div style={{ display: "flex" }}>{columns}</div>
      </div>
    </Container>
  );
};

export default WeekPlan;
