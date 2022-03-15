import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/auth";

function RecipeDetails(props) {
  const [ ingredients, setIngredients ] = useState([]);
  const [ instructions, setInstructions ] = useState([]);
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    axiosWithAuth().get(`recipes/${props.recipe_id}`)
      .then(res => {
        setIngredients(res.data.ingredients);
        setInstructions(res.data.instructions);
        setCategories(res.data.categories);
      })
      .catch(err => console.log(err))
  }, [])

  return(
    <div>
      {ingredients.map(ing => {
        return(<p>{ing.ingredient_name}</p>)
      })}
      {instructions.map(ins => {
        return(<p>{ins.instruction_step}: {ins.instruction_name}</p>)
      })}
      {categories.map(cate => {
        return(<p>{cate.category_name}</p>)
      })}
    </div>
  )
}

export default RecipeDetails;