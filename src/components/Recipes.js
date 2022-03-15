import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/auth";
import Recipe from "./Recipe";

function Recipes() {
  const [ recipes, setRecipes ] = useState([]);

  useEffect(() => {
    axiosWithAuth().get('/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err))
  }, [])

  return(
    <div>
      {recipes.map(recipe => {
        return(<Recipe key={recipe.recipe_id} recipe={recipe}/>)
      })}
    </div>
  )
}

export default Recipes;