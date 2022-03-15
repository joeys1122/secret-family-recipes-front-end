import React, { useState } from "react";
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
      <button onClick={showDetails}>View</button>
      {details && <RecipeDetails recipe_id={recipe_id}/>}
    </div>
  )
}

export default Recipe;