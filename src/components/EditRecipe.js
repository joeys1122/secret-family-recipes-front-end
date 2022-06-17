import React, { useState, useEffect } from "react";
import { axiosWithAuth } from "../utils/auth";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
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
          <Row className="mb-3">
            <Form.Group as={Col}>
              <Form.Label>Recipe Name</Form.Label>
              <Form.Control type='text' name='title' onChange={handleChange} value={recipe.title}/>
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Recipe Creator</Form.Label>
              <Form.Control type='text' name='source' onChange={handleChange} value={recipe.source}/>
            </Form.Group>
          </Row>

          <Row className="mb-3">
            <h5 className="mb-2">Edit Instructions</h5>
            {recipe.instructions.map((ins, index) => {
              return(
                <Row>
                  <Form.Group as={Col}>
                    <Form.Control type='number' name='instruction_step' onChange={(e) => instructionChange(e.target.name, e.target.value, index)} value={ins.instruction_step} />
                  </Form.Group>

                  <Form.Group as={Col}>
                    <Form.Control type='text' name='instruction_name' onChange={(e) => instructionChange(e.target.name, e.target.value, index)} value={ins.instruction_name} />
                  </Form.Group>
                  
                  
                </Row>
              );
            })}
          </Row>

          <Row className="mb-3">
            <h5 className="mb-2">Edit Ingredients</h5>
            {recipe.ingredients.map((ing, index) => {
              return(
                <Row>
                  <Form.Group as={Col}>
                    <Form.Control type='text' name='ingredient_name' onChange={(e) => ingredientChange(e.target.name, e.target.value, index)} value={ing.ingredient_name} />
                  </Form.Group>
                </Row>
              );
            })}
          </Row>

          <Row className="mb-3">
            <h5 className="mb-2">Edit Categories</h5>
            {recipe.categories.map((cat, index) => {
              return(
                <Row>
                  <Form.Group as={Col}>
                    <Form.Control type='text' name='category_name' onChange={(e) => categoryChange(e.target.name, e.target.value, index)} value={cat.category_name} />
                  </Form.Group>
                </Row>
              );
            })}
          </Row>
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