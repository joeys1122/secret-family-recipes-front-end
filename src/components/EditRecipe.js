import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/auth";
import { Container, Modal, Button, Form } from "react-bootstrap";

function EditRecipe(props) {
  const { recipe_id, showEdit, handleEdit} = props;

  const [ recipe, setRecipe ] = useState({
    title: '',
    source: '',
    instructions: [],
    ingredients: [],
    categories: []
  });

  useEffect(() => {
    axiosWithAuth().get(`recipes/${recipe_id}`)
      .then(res => {
        setRecipe(res.data);
      })
      .catch(err => console.log(err))
  }, [])

  const handleChange = e => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log(recipe);
    handleEdit();
  };

  const instructionChange = (name, value, index) => {
    let newIns = [...recipe.instructions];
    let newInstruction = {...newIns[index]};
    newInstruction[name] = value;
    newIns[index] = newInstruction;

    setRecipe({
      ...recipe,
      instructions: [...newIns]
    });
  }

  return(
    <Modal show={showEdit} onHide={handleEdit} centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Recipe</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Label>Title:</Form.Label>
            <Form.Control type='text' name='title' onChange={handleChange} value={recipe.title} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Source:</Form.Label>
            <Form.Control type='text' name='source' onChange={handleChange} value={recipe.source} />
          </Form.Group>

          <Form.Group>
            <Form.Label>Instructions:</Form.Label>
            {recipe.instructions.map((ins, index) => {
              return(
                <>
                  <Form.Control type='number' name='instruction_step' onChange={(e) => instructionChange(e.target.name, e.target.value, index)} value={ins.instruction_step} />
                  <Form.Control type='text' name='instruction_name' onChange={(e) => instructionChange(e.target.name, e.target.value, index)} value={ins.instruction_name} />
                </>
              );
            })}
          </Form.Group>

          <Form.Group>
            <Form.Label>Ingredients:</Form.Label>
            {recipe.ingredients.map(ing => {
              return(<p>{ing.ingredient_name}</p>);
            })}
            {/* <Form.Control type='text' name='ingredient_name' onChange={ingredientChange} value={ingredient.ingredient_name} />
            <Button size="sm" onClick={ingredientSubmit}>Add Ingredient</Button> */}
          </Form.Group>

          <Form.Group>
            <Form.Label>Categories:</Form.Label>
            {recipe.categories.map(cat => {
              return(<p>{cat.category_name}</p>);
            })}
            {/* <Form.Control type='text' name='category_name' onChange={categoryChange} value={category.category_name} />
            <Button size="sm" onClick={categorySubmit}>Add Categories</Button> */}
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button onClick={handleEdit}>Close</Button>
        <Button onClick={handleSubmit} type="submit">Save Changes</Button>
      </Modal.Footer>
    </Modal>
  )
};

export default EditRecipe;