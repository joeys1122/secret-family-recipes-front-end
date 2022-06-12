import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { axiosWithAuth } from "../utils/auth";
import { Container, ButtonGroup, Button } from "react-bootstrap";
import EditRecipe from "./EditRecipe";

function RecipeDetails(props) {
  const { recipe_id } = useParams();
  const navigate = useNavigate();
  const [ details, setDetails ] = useState({});
  const [ ingredients, setIngredients ] = useState([]);
  const [ instructions, setInstructions ] = useState([]);
  const [ categories, setCategories ] = useState([]);
  const [ showEdit, setShowEdit ] = useState(false);

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

  const handleDelete = () => {
    axiosWithAuth().delete(`recipes/${recipe_id}`)
      .then(res => {
        navigate('/recipes');
      })
      .catch(err => console.log(err));
  };

  const handleEdit = () => setShowEdit(!showEdit);

  return(
    <Container>
      <h2>{details.title} By {details.source}</h2>
      <ButtonGroup>
        <Button onClick={handleEdit}>Edit</Button>
        <Button onClick={handleDelete}>Delete</Button>
      </ButtonGroup>
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
      {showEdit && <EditRecipe recipe_id={recipe_id} showEdit={showEdit} handleEdit={handleEdit} />}
    </Container>
  )
}

export default RecipeDetails;