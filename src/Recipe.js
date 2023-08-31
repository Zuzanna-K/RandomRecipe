import React from 'react';
import style from './recipe.module.css';

const Recipe = ({ title, image, ingredients, selectedIngredient, url }) => {
  const filteredIngredients = ingredients.filter(ingredient =>
    !selectedIngredient || ingredient.food.includes(selectedIngredient)
  );

  return (
    <div className={style.recipe}>
      <h1>{title}</h1>

      <img className={style.image} src={image} alt="" />
      <ol>
  {ingredients.map((ingredient, index) => (
    <li key={index}>{ingredient.text}</li>
  ))}
</ol>

<p>Link to Recipe: <a href={url} target="_blank" rel="noopener noreferrer">{url}</a></p>
    </div>
  );
};

export default Recipe;
