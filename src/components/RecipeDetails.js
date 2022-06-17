import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { axiosWithAuth } from "../utils/auth";
import { Container, ButtonGroup, Button, Badge, Tabs, Tab } from "react-bootstrap";
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
    <Container className="pt-5 mt-5 text-center">
      <Container className="border">
        <h2 className="my-3">{details.title} - {details.source}</h2>

        <Tabs defaultActiveKey="instructions" className="justify-content-center mb-3">
          <Tab eventKey="instructions" title="Instructions">
            {instructions.map(ins => {
              return(<p key={Math.random()}>{ins.instruction_step}: {ins.instruction_name}</p>)
            })} 
          </Tab>
          <Tab eventKey="ingredients" title="Ingredients">
            {ingredients.map(ing => {
              return(<p key={Math.random()}>{ing.ingredient_name}</p>)
            })}
          </Tab>
        </Tabs>

        <Container className="d-block">
          {categories.map(cate => {
            return(<Badge className="me-2 my-3" key={Math.random()}>{cate.category_name}</Badge>)
          })}
        </Container>

      </Container>

      <ButtonGroup className="mt-5">
        <Button onClick={handleEdit}>Edit Recipe</Button>
        <Button onClick={handleDelete}>Delete Recipe</Button>
      </ButtonGroup>

      {showEdit && <EditRecipe recipe_id={recipe_id} showEdit={showEdit} handleEdit={handleEdit} />}
      {showDelete && <DeleteRecipe recipe_id={recipe_id} showDelete={showDelete} handleDelete={handleDelete} details={details} />}
    </Container>
  )
}

export default RecipeDetails;