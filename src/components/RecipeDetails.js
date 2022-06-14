import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosWithAuth } from "../utils/auth";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import EditRecipe from "./EditRecipe";
import DeleteRecipe from "./DeleteRecipe";

function RecipeDetails(props) {
  const { recipe_id } = useParams();
  const [ details, setDetails ] = useState({});
  const [ ingredients, setIngredients ] = useState([]);
  const [ instructions, setInstructions ] = useState([]);
  const [ categories, setCategories ] = useState([]);
  const [ showEdit, setShowEdit ] = useState(false);
  const [ showDelete, setShowDelete ] = useState(false);

  useEffect(() => {
    axiosWithAuth().get(`recipes/${recipe_id}`)
      .then(res => {
        setDetails({title: res.data.title, source: res.data.source});
        setIngredients(res.data.ingredients);
        setInstructions(res.data.instructions);
        setCategories(res.data.categories);
      })
      .catch(err => console.log(err))
  }, []) // eslint-disable-line

  const handleEdit = () => setShowEdit(!showEdit);

  const handleDelete = () => setShowDelete(!showDelete);

  return(
    <Container>
      <h2>{details.title} By {details.source}</h2>
      <ButtonGroup>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </ButtonGroup>
      <h3>Instructions:</h3>
      {instructions.map(ins => {
        return(<p>{ins.instruction_step}: {ins.instruction_name}</p>)
      })}
      <h3>Ingredients:</h3>
      {ingredients.map(ing => {
        return(<p>{ing.ingredient_name}</p>)
      })}
      <h3>Categories:</h3>
      {categories.map(cate => {
        return(<p>{cate.category_name}</p>)
      })}
      {showEdit && <EditRecipe recipe_id={recipe_id} showEdit={showEdit} handleEdit={handleEdit} />}
      {showDelete && <DeleteRecipe recipe_id={recipe_id} showDelete={showDelete} handleDelete={handleDelete} details={details} />}
    </Container>
  )
}

export default RecipeDetails;