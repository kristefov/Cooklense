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

  if(query === "cuisine") {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?a=${value}`
    );
    const data = await response.json();
    return data;
  }

    if(query === "category") {
    const response = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?c=${value}`
    );
    const data = await response.json();
    return data;
  }
};

export const getCategories = async () => {
  const response = await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?c=list`)
  const { meals } = await response.json();
  return meals;
}

export const getCountries = async () => {
  const response = await fetch (`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
  const { meals } = await response.json();
  return meals;
}