import React from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
// import { REMOVE_INGREDIENT } from "../../utils/mutations";

const ShoppingList = () => {
  const { loading, error, data, refetch } = useQuery(GET_ME);
  const user = data?.me;
  const savedIngredients = user?.shoppingList || [];
  console.log(savedIngredients);

//   const [removeIngredient] = useMutation(REMOVE_INGREDIENT);

  const handleRemoveIngredient = async (ingredientId) => {
    return;
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <Container className="d-flex justify-content-center">
      <div className="w-50">
        <h3 className="text-center">Saved Recipes</h3>
        <ListGroup>
          {savedIngredients.map((ingredient, index) => (
            <ListGroup.Item key={index}>
              <Button
                variant="link"
                size="sm"
                className="text-danger"
                onClick={() => handleRemoveIngredient(ingredient)}
              >
                X
              </Button>
              {ingredient}
            </ListGroup.Item>
          ))}
        </ListGroup>
      </div>
    </Container>
  );
};

export default ShoppingList;
