export const appendIngredients = (data) => {
    return data.map((meal) => {
      const ingredientNames = Object.keys(meal)
        .filter((key) => key.startsWith("strIngredient"))
        .map((key) => {
          const ingredient = meal[key];
          return ingredient ? ingredient.toLowerCase() : ingredient;
        })
        .filter((ingredient) => ingredient !== "");
 
      return {
        ...meal,
        ingredientNames: ingredientNames,
      };
    });
  };