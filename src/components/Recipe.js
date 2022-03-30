import React, { useState } from "react";
import { Link } from "react-router-dom";
import RecipeDetails from "./RecipeDetails";

function Recipe(props) {
  const { recipe_id, title, source } = props.recipe;
  const [ details, setDetails ] = useState(false);

  const showDetails = () => {
    setDetails(!details);
  }

  return(
    <div>
      <p>Recipe: {title} By: {source}</p>
      <Link to={`/recipes/${recipe_id}`}>View</Link>
      {/* <button onClick={showDetails}>View</button>
      {details && <RecipeDetails key={recipe_id} recipe_id={recipe_id}/>} */}
    </div>
  )
}

export default Recipe;