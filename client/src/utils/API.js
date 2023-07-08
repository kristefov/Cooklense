export const recipeSearch = async (query, value) => {
  if (query === "searchName") {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    );
    const data = await response.json();
    return data;
  }

  if (query === "searchIngredient") {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`
    );
    const data = await response.json();
    return data;
  }
};
