export const recipeSearch = async (query, value) => {
  if (query === "name") {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`
    );
    const data = await response.json();
    return data;
  };

  if (query === "ingredient") {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${value}`
    );
    const data = await response.json();
    return data;
  };

  if(query === "searchById") {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${value}`
    );
    const data = await response.json();
    return data;
  }
};
