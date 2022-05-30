import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/auth";
import Recipe from "./Recipe";
import { Container, Row } from "react-bootstrap";

function Recipes() {
  const [ recipes, setRecipes ] = useState([]);

  useEffect(() => {
    axiosWithAuth().get('/recipes')
      .then(res => setRecipes(res.data))
      .catch(err => console.log(err))
  }, [])

  return(
    <Container>
      <Row xs={1} md={2}>
        {recipes.map(recipe => {
          return(<Recipe key={recipe.recipe_id} recipe={recipe}/>)
        })}
      </Row>
    </Container>
  )
}

export default Recipes;