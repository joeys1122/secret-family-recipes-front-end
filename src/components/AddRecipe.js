import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosWithAuth } from "../utils/auth";
import { Container, Form, Button, Row, Col, ListGroup, InputGroup } from 'react-bootstrap';

function AddRecipe() {
  const navigate = useNavigate();

  const [ recipe, setRecipe ] = useState({
    title: '',
    source: '',
    instructions: [],
    ingredients: [],
    categories: []
  });

  const [ instruction, setInstruction ] = useState({
    instruction_step: '',
    instruction_name: ''
  });

  const [ ingredient, setIngredient ] = useState({
    ingredient_name: ''
  });

  const [ category, setCategory ] = useState({
    category_name: ''
  });

  
  const handleChange = e => {
    setRecipe({
      ...recipe,
      [e.target.name]: e.target.value
    });
  };
  const handleSubmit = e => {
    e.preventDefault();

    axiosWithAuth().post('/recipes', recipe)
      .then(res => {
        navigate('/recipes');
      })
      .catch(err => console.log(err));
  }

  const instructionChange = e => {
    setInstruction({
      ...instruction,
      [e.target.name]: e.target.value
    });
  };
  const instructionSubmit = () => {
    setRecipe({
      ...recipe,
      instructions: [...recipe.instructions, instruction]
    });
    setInstruction({
      instruction_step: '',
      instruction_name: ''
    });
  };

  const ingredientChange = e => {
    setIngredient({
      ...ingredient,
      [e.target.name]: e.target.value
    });
  };
  const ingredientSubmit = () => {
    setRecipe({
      ...recipe,
      ingredients: [...recipe.ingredients, ingredient]
    });
    setIngredient({
      ingredient_name: ''
    });
  };

  const categoryChange = e => {
    setCategory({
      ...category,
      [e.target.name]: e.target.value
    });
  };
  const categorySubmit = () => {
    setRecipe({
      ...recipe,
      categories: [...recipe.categories, category]
    });
    setCategory({
      category_name: ''
    });
  };

  return(
    <Container className="pt-5 mt-5">
      <h2 className="text-center mb-5">Add New Recipe</h2>
      <Form onSubmit={handleSubmit}>
        <Row className="mb-3">
          <Form.Group as={Col}>
            <Form.Label>Recipe Name</Form.Label>
            <Form.Control type='text' name='title' onChange={handleChange} value={recipe.title} placeholder="Enter Recipe Name"/>
          </Form.Group>

          <Form.Group as={Col}>
            <Form.Label>Recipe Creator</Form.Label>
            <Form.Control type='text' name='source' onChange={handleChange} value={recipe.source} placeholder="Enter Recipe Creator"/>
          </Form.Group>
        </Row>

        <Row>
          <ListGroup className="my-3">
            <ListGroup.Item variant="primary">Instructions</ListGroup.Item>
            {recipe.instructions.map(ins => {
              return(<ListGroup.Item>{ins.instruction_step}. {ins.instruction_name}</ListGroup.Item>);
            })}
          </ListGroup>

          <Form.Group as={Col}>
            <Form.Label>Instruction Step</Form.Label>
            <Form.Control type='number' name='instruction_step' onChange={instructionChange} value={instruction.instruction_step} placeholder='Enter Instruction Step Number' />
          </Form.Group>

          <Form.Group as={Col} className="mb-3">
            <Form.Label>Instruction Description</Form.Label>
            <InputGroup>
              <Form.Control type='text' name='instruction_name' onChange={instructionChange} value={instruction.instruction_name} placeholder='Enter Instruction Description' />
              <Button size="sm" variant="outline-primary" onClick={instructionSubmit}>Add Instruction</Button>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row>
          <ListGroup className="my-3">
            <ListGroup.Item variant="primary">Ingredients</ListGroup.Item>
            {recipe.ingredients.map(ing => {
              return(<ListGroup.Item>{ing.ingredient_name}</ListGroup.Item>);
            })}
          </ListGroup>

          <Form.Group as={Col} className="mb-3">
            <Form.Label>Ingredient Name</Form.Label>
            <InputGroup>
              <Form.Control type='text' name='ingredient_name' onChange={ingredientChange} value={ingredient.ingredient_name} placeholder='Enter Ingredient Name'/>
              <Button size="sm" variant="outline-primary" onClick={ingredientSubmit}>Add Ingredient</Button>
            </InputGroup>
          </Form.Group>
        </Row>

        <Row>
          <ListGroup className="my-3">
            <ListGroup.Item variant="primary">Categories</ListGroup.Item>
            {recipe.categories.map(cat => {
              return(<ListGroup.Item>{cat.category_name}</ListGroup.Item>);
            })}
          </ListGroup>

          <Form.Group as={Col} className="mb-3">
            <Form.Label>Category Name</Form.Label>
            <InputGroup>
              <Form.Control type='text' name='category_name' onChange={categoryChange} value={category.category_name} placeholder='Enter Category Name'/>
              <Button size="sm" variant="outline-primary" onClick={categorySubmit}>Add Categories</Button>
            </InputGroup>
          </Form.Group>
        </Row>

        <Button size="lg" className='d-block m-auto my-5 w-25' type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default AddRecipe;