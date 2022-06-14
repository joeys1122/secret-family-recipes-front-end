import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/auth";
import { Modal, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function EditRecipe(props) {
  const { recipe_id, showEdit, handleEdit } = props;

  const navigate = useNavigate();

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
  }, []) //eslint-disable-line

  const handleChange = e => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = e => {
    e.preventDefault();

    console.log(recipe)

    axiosWithAuth().put(`recipes/${recipe_id}`, recipe)
      .then(res => {
        handleEdit();
        navigate(`/recipes`)
      })
      .catch(err => console.log(err));
  };

  const instructionChange = (name, value, index) => {
    let newIns = [...recipe.instructions];
    let newItem = {...newIns[index]};
    newItem[name] = value;
    newIns[index] = newItem;

    setRecipe({
      ...recipe,
      instructions: [...newIns]
    });
  };

  const ingredientChange = (name, value, index) => {
    let newIngs = [...recipe.ingredients];
    let newItem = {...newIngs[index]};
    newItem[name] = value;
    newIngs[index] = newItem;

    setRecipe({
      ...recipe,
      ingredients: [...newIngs]
    });
  };

  const categoryChange = (name, value, index) => {
    let newCats = [...recipe.categories];
    let newItem = {...newCats[index]};
    newItem[name] = value;
    newCats[index] = newItem;

    setRecipe({
      ...recipe,
      categories: [...newCats]
    });
  };

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
            <Button size='sm' >Add Instruction</Button>
          </Form.Group>

          <Form.Group>
            <Form.Label>Ingredients:</Form.Label>
            {recipe.ingredients.map((ing, index) => {
              return(
                <>
                  <Form.Control type='text' name='ingredient_name' onChange={(e) => ingredientChange(e.target.name, e.target.value, index)} value={ing.ingredient_name} />
                </>
              );
            })}
            <Button size='sm' >Add Ingredient</Button>
          </Form.Group>

          <Form.Group>
            <Form.Label>Categories:</Form.Label>
            {recipe.categories.map((cat, index) => {
              return(
                <>
                  <Form.Control type='text' name='category_name' onChange={(e) => categoryChange(e.target.name, e.target.value, index)} value={cat.category_name} />
                </>
              );
            })}
            <Button size='sm' >Add Category</Button>
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