import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { axiosWithAuth } from "../utils/auth";
import { Container, Form, Button } from 'react-bootstrap';

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
    <Container>
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
          {recipe.instructions.map(ins => {
            return(<p>{ins.instruction_step}. {ins.instruction_name}</p>);
          })}
          <Form.Control type='number' name='instruction_step' onChange={instructionChange} value={instruction.instruction_step} placeholder='Enter Instruction Step Number' />
          <Form.Control type='text' name='instruction_name' onChange={instructionChange} value={instruction.instruction_name} placeholder='Enter Instruction Name' />
          <Button size="sm" onClick={instructionSubmit}>Add Instruction</Button>
        </Form.Group>

        <Form.Group>
          <Form.Label>ingredients:</Form.Label>
          {recipe.ingredients.map(ing => {
            return(<p>{ing.ingredient_name}</p>);
          })}
          <Form.Control type='text' name='ingredient_name' onChange={ingredientChange} value={ingredient.ingredient_name} />
          <Button size="sm" onClick={ingredientSubmit}>Add Ingredient</Button>
        </Form.Group>

        <Form.Group>
          <Form.Label>categories:</Form.Label>
          {recipe.categories.map(cat => {
            return(<p>{cat.category_name}</p>);
          })}
          <Form.Control type='text' name='category_name' onChange={categoryChange} value={category.category_name} />
          <Button size="sm" onClick={categorySubmit}>Add Categories</Button>
        </Form.Group>

        <Button size="lg" className='mt-5' type="submit">Submit</Button>
      </Form>
    </Container>
  )
}

export default AddRecipe;