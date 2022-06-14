import React from 'react';
import { Routes, Route } from 'react-router-dom';

import { isLogin, logout } from './utils/auth';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Recipes from './components/Recipes';
import RecipeDetails from './components/RecipeDetails';
import AddRecipe from './components/AddRecipe';

import PrivateRoute from './components/PrivateRoute';

import { Navbar, Nav, Container, Col, Button, ButtonGroup } from 'react-bootstrap';

function App() {
  return(
    <div className="App">
      <header>
        <Navbar bg='dark' variant='dark'>
          <Container>
            <Navbar.Brand href='/'>Secret Family Recipes</Navbar.Brand>
            <Nav>
              <Nav.Link href='/recipes'>Recipes</Nav.Link>
              <Nav.Link href='/add-recipe'>Add Recipe</Nav.Link>
            </Nav>
            {isLogin() ? 
            <Button onClick={logout} href='/'>Logout</Button> :
            <ButtonGroup>
              <Button href='/login'>Login</Button>
              <Button href='/signup'>Signup</Button>
            </ButtonGroup>}
          </Container>
        </Navbar>
      </header>

      <Routes>
        <Route 
          exact path='/add-recipe' 
          element={
            <PrivateRoute>
              <AddRecipe/>
            </PrivateRoute>
          }
        />
        <Route 
          exact path='/recipes' 
          element={
            <PrivateRoute>
              <Recipes/>
            </PrivateRoute>
          }
        />
        <Route 
          exact path='/recipes/:recipe_id' 
          element={
            <PrivateRoute>
              <RecipeDetails/>
            </PrivateRoute>
          }
        />
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/signup' element={<Signup/>}/>
        <Route exact path='/' element={<Home/>}/>
      </Routes>

      <Container>
        <footer className="d-flex justify-content-between align-items-center py-3 my-4 border-top">
          <Col>
            <span className="text-muted">Created by Joe Stanton</span>
          </Col>
          <Nav className="col-md-4 justify-content-end d-flex">
            <Nav.Link href="https://www.linkedin.com/in/joseph-c-stanton/" target="_blank">
              <i class="bi bi-linkedin text-muted"/>
            </Nav.Link>
            <Nav.Link href="https://github.com/joeys1122" target="_blank">
              <i class="bi bi-github text-muted"/>
            </Nav.Link>
          </Nav>
        </footer>
      </Container>

    </div>
  )
}

export default App;
