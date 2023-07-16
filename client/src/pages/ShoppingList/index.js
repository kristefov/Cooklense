import React from "react";
import { Button, Container, ListGroup } from "react-bootstrap";
import { useMutation, useQuery } from "@apollo/client";
import { GET_ME } from "../../utils/queries";
import { REMOVE_INGREDIENT_FROM_SHOPPING_LIST } from "../../utils/mutations";

const ShoppingList = () => {
  const { loading, error, data, refetch } = useQuery(GET_ME);
  const user = data?.me;
  const savedIngredients = user?.shoppingList || [];

  const [removeIngredient] = useMutation(REMOVE_INGREDIENT_FROM_SHOPPING_LIST);

  const handleRemoveIngredient = async (ingredient) => {
    console.log(ingredient)
    try {
      await removeIngredient({
        variables: {
          ingredient,
        },
      });
      refetch();
    } catch (error) {
      console.error("Error removing ingredient:", error);
    }
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
        {savedIngredients.length === 0 ? (
          <p className="text-center">Your shopping list is empty</p>
        ) : (
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
        )}
      </div>
    </Container>
  );
};

export default ShoppingList;
