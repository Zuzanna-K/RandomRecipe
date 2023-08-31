import React from 'react';
import style from './recipe.module.css';

const Recipe = ({ title, cuisineType, image, ingredients, healthLabels, selectedIngredient }) => {
  const filteredIngredients = ingredients.filter(ingredient =>
    !selectedIngredient || ingredient.food.includes(selectedIngredient)
  );

  return (
    <div className={style.recipe}>
      <h1>{title}</h1>
      <div className="cuisine-labels">
        <p>cuisineTypes:</p>
        <ul>
          {cuisineType.map((label, index) => (
            <li key={index}>{label}</li>
          ))}
        </ul>
      </div>
      <img className={style.image} src={image} alt="" />
      <ol>
  {ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient.text}</li>
  ))}
</ol>

      <div className="health-labels">
        <p>Health Labels:</p>
        <ul>
          {healthLabels.map((label, index) => (
            <li key={index}>{label}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Recipe;
