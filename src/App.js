import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { isLogin, logout } from './utils/auth';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Recipes from './components/Recipes';
import RecipeDetails from './components/RecipeDetails';
import AddRecipe from './components/AddRecipe';

import PrivateRoute from './components/PrivateRoute';

import { Navbar, Nav, Container, Button, ButtonGroup } from 'react-bootstrap';

function App() {
  const navigate = useNavigate();

  return(
    <div className="App">
      <header className='fixed-top'>
        <Navbar bg='dark' variant='dark' >
          <Container>
            <Navbar.Brand>Secret Family Recipes</Navbar.Brand>
            <Nav className='flex-grow-1'>
              <Nav.Link onClick={() => navigate('/')}>Home</Nav.Link>
              <Nav.Link onClick={() => navigate('/recipes')}>Recipes</Nav.Link>
            </Nav>

            <Nav className='me-4'>
              <Nav.Link href="https://www.linkedin.com/in/joseph-c-stanton/" target="_blank">
                <i className="bi bi-linkedin text-muted"/>
              </Nav.Link>
              <Nav.Link href="https://github.com/joeys1122" target="_blank">
                <i className="bi bi-github text-muted"/>
              </Nav.Link>
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
    </div>
  )
}

export default App;
