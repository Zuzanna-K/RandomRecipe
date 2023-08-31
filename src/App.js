import React, { useState, useEffect } from "react";
import Recipe from './Recipe';
import './App.css';

const App = () => {

  const APP_ID = "9a72cfd2";
  const APP_KEY = "32ce831b9d239dddeb143ca188fa106c";

  const [recipe, setRecipe] = useState(null);
  const [search, setSearch] = useState("");
  const [selectedHealth, setSelectedHealth] = useState('');
  const [selectedCuisine, setSelectedCuisine] = useState('');
  const [selectedIngredient, setSelectedIngredient] = useState('');
  const [error, setError] = useState(null);
  const [searchClicked, setSearchClicked] = useState(false);

  useEffect(() => {
    if (searchClicked) {
      getRandomRecipe();
    }
  }, [selectedHealth, selectedCuisine, selectedIngredient, searchClicked]);
  
  


 const getRandomRecipe = async () => {
  if (!search.trim()) {
    setError("Please enter a valid search query.");
    return;
  }

  setError(null);

  let url = `https://api.edamam.com/search?q=${search}&app_id=${APP_ID}&app_key=${APP_KEY}`;
  if (selectedHealth) {
    url += `&health=${selectedHealth}`;
  }
  if (selectedCuisine) {
    url += `&cuisineType=${encodeURIComponent(selectedCuisine)}`;
  }

  const response = await fetch(url);
  const data = await response.json();

  if (data.hits.length === 0) {
    setError("No recipes found for the given query.");
    setRecipe(null);
    return;
  }

  let recipesToChooseFrom = data.hits;
  
    if (selectedIngredient) {
      recipesToChooseFrom = data.hits.filter(hit => {
        const ingredients = hit.recipe.ingredients.map(ingredient => ingredient.food.toLowerCase());
        return ingredients.includes(selectedIngredient.toLowerCase());
      });
  
      if (recipesToChooseFrom.length === 0) {
        setError(`No recipes found with the ingredient: ${selectedIngredient}`);
        setRecipe(null);
        return;
      }
    }

    const randomIndex = Math.floor(Math.random() * recipesToChooseFrom.length);
    const randomRecipe = recipesToChooseFrom[randomIndex].recipe;
    setRecipe(randomRecipe);
  setRecipe(randomRecipe);
  setSearchClicked(false);
};


  const updateSearch = e => {
    setSearch(e.target.value);
  }

  const updateSelectedHealth = e => {
    setSelectedHealth(e.target.value);
  }

  const updateSelectedCuisine = e => {
    setSelectedCuisine(e.target.value);
  }

  const handleSearchClick = async (e) => {
    e.preventDefault();
    setSearchClicked(true); // Set searchClicked to true when the button is clicked
    await getRandomRecipe();
  }

  return (
    <div className="App">
      <form onSubmit={handleSearchClick} className="search-form">
        <input className="ingredients-bar" type="text" value={search} onChange={updateSearch} placeholder="Search for dish" />
        <input
        className="ingredients-bar"
        type="text"
        value={selectedIngredient}
        onChange={e => setSelectedIngredient(e.target.value)}
        placeholder="Enter ingredient to filter by"
        />
        <button className="search-button" type="submit">
          Get Recipe
        </button>
      </form>
      <div className="filter-bar">
        <label>Health Labels:</label>
        <select value={selectedHealth} onChange={updateSelectedHealth}>
          <option value="">Any</option>
          <option value="">Any</option>
          <option value="alcohol-cocktail">Alcohol Cocktail</option>
          <option value="alcohol-free">Alcohol Free</option>
          <option value="celery-free">Celery Free</option>
          <option value="crustacean-free">Crustacean Free</option>
          <option value="dairy-free">Dairy Free</option>
          <option value="egg-free">Egg Free</option>
          <option value="fish-free">Fish Free</option>
          <option value="fodmap-free">FODMAP Free</option>
          <option value="gluten-free">Gluten Free</option>
          <option value="immuno-supportive">Immuno Supportive</option>
          <option value="keto-friendly">Keto Friendly</option>
          <option value="kidney-friendly">Kidney Friendly</option>
          <option value="kosher">Kosher</option>
          <option value="low-potassium">Low Potassium</option>
          <option value="low-sugar">Low Sugar</option>
          <option value="lupine-free">Lupine Free</option>
          <option value="Mediterranean">Mediterranean</option>
          <option value="mollusk-free">Mollusk Free</option>
          <option value="mustard-free">Mustard Free</option>
          <option value="no-oil-added">No Oil Added</option>
          <option value="paleo">Paleo</option>
          <option value="peanut-free">Peanut Free</option>
          <option value="pecatarian">Pescatarian</option>
          <option value="pork-free">Pork Free</option>
          <option value="red-meat-free">Red Meat Free</option>
          <option value="sesame-free">Sesame Free</option>
          <option value="shellfish-free">Shellfish Free</option>
          <option value="soy-free">Soy Free</option>
          <option value="sugar-conscious">Sugar Conscious</option>
          <option value="sulfite-free">Sulfite Free</option>
          <option value="tree-nut-free">Tree Nut Free</option>
          <option value="vegan">Vegan</option>
          <option value="vegetarian">Vegetarian</option>
          <option value="wheat-free">Wheat Free</option>       
           </select>
      </div>

      <div className="filter-bar">
        <label>Cuisine:</label>
        <select value={selectedCuisine} onChange={updateSelectedCuisine}>
          <option value="">Any</option>
          <option value="american">American</option>
          <option value="asian">Asian</option>
          <option value="british">British</option>
          <option value="caribbean">Caribbean</option>
          <option value="chinese">Chinese</option>
          <option value="french">French</option>
          <option value="greek">Greek</option>
          <option value="indian">Indian</option>
          <option value="italian">Italian</option>
          <option value="japanese">Japanese</option>
          <option value="korean">Korean</option>
          <option value="kosher">Kosher</option>
          <option value="mediterranean">Mediterranean</option>
          <option value="mexican">Mexican</option>
          <option value="nordic">Nordic</option>
          <option value="world">World</option>

    </select>
      </div>
      {error && <p className="error-message">{error}</p>}
      {recipe && (
        <div className="recipes">
          <Recipe
            title={recipe.label}
            cuisineType={recipe.cuisineType}
            calories={recipe.calories}
            image={recipe.image}
            ingredients={recipe.ingredients}
            healthLabels={recipe.healthLabels}
            selectedIngredient={selectedIngredient}
            url={recipe.url} 
          />
        </div>
      )}
    </div>
  );
}

export default App;