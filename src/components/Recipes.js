import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/auth";
import Recipe from "./Recipe";
import { Container, Row, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function Recipes() {
  const navigate = useNavigate();
  const [ recipes, setRecipes ] = useState([]);

  useEffect(() => {
    axiosWithAuth().get('/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err))
  }, [])

  return(
    <Container className="my-5 py-5">
      <Row xs={2} md={3}>
        {recipes.map(recipe => {
          return(<Recipe key={recipe.recipe_id} recipe={recipe}/>)
        })}
      </Row>
      <Button size="lg" className="d-block m-auto mt-5" onClick={() => navigate('/add-recipe')}>Add New Recipe</Button>
    </Container>
  )
}

export default Recipes;