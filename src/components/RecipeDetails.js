import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosWithAuth } from "../utils/auth";

function RecipeDetails(props) {
  const { recipe_id } = useParams();
  const [ details, setDetails ] = useState({});
  const [ ingredients, setIngredients ] = useState([]);
  const [ instructions, setInstructions ] = useState([]);
  const [ categories, setCategories ] = useState([]);

  useEffect(() => {
    axiosWithAuth().get(`recipes/${recipe_id}`)
      .then(res => {
        setDetails({title: res.data.title, source: res.data.source});
        setIngredients(res.data.ingredients);
        setInstructions(res.data.instructions);
        setCategories(res.data.categories);
      })
      .catch(err => console.log(err))
  }, [])
  console.log(details)
  return(
    <div>
      <h2>{details.title} By {details.source}</h2>
      <h3>Ingredients:</h3>
      {ingredients.map(ing => {
        return(<p>{ing.ingredient_name}</p>)
      })}
      <h3>Instructions:</h3>
      {instructions.map(ins => {
        return(<p>{ins.instruction_step}: {ins.instruction_name}</p>)
      })}
      <h3>Categories:</h3>
      {categories.map(cate => {
        return(<p>{cate.category_name}</p>)
      })}
    </div>
  )
}

export default RecipeDetails;