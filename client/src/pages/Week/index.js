import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Button, Card, Image, Col } from "react-bootstrap";
import "./style.css";
import { GET_ME } from "../../utils/queries";
import { REMOVE_MEAL_FROM_WEEKPLAN } from "../../utils/mutations";
import { useQuery, useMutation } from "@apollo/client";

// Add seven day week plan for meals to be saved or removed
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

      setSavedWeekPlan(res.data.removeMealFromWeekPlan.weekPlan);
    } catch (error) {
      console.log("Error removing meal:", error);
    }
  };

// Add chosen meals and images to week plan
  const mealItems = (meals) =>
    meals.map((meal, index) => (
      <Col style={{ backgroundColor: "rgb(240,173,78)" }}>
        <Card className="m-1 border border-warning" key={index}>
          <Link
            to={`/recipe/${meal.idMeal}`}
            style={{ textDecoration: "none", color: "black" }}
            className="meal-link"
          >
            <Image
              className="rounded-circle p-1  border border-warning"
              style={{ maxWidth: "170px" }}
              src={meal.strMealThumb}
            />
          </Link>{" "}
          <div className="d-flex  justify-content-center align-self-center align-items-center align-items-baseline">
            <p style={{ textAlign: "center", margin: "1px" }}>
              {meal.strMeal}{" "}
            </p>
            <Button
              className="align-self-center"
              style={{ width: "40px", padding: "10px" }}
              variant="danger"
              onClick={() => handleRemoveMeal(meal._id)}
            >
              x
            </Button>
          </div>
        </Card>
      </Col>
    ));

  const columns = weekdays.map((weekday, index) => {
    const mealsByDay = savedWeekPlan
      .filter((meal) => meal.day === weekday)
      .flatMap((meal) => meal.recipeData);
    return (
      <div className="column mt-5" key={index}>
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
