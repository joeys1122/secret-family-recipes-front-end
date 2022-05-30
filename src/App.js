import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';

import Home from './components/Home';
import Login from './components/Login';
import Signup from './components/Signup';
import Recipes from './components/Recipes';
import RecipeDetails from './components/RecipeDetails';
import PrivateRoute from './components/PrivateRoute';

import { Navbar, Nav, Container, Col, Row, Button } from 'react-bootstrap';

function App() {
  return(
    <div className="App">
      <header>
        <Navbar bg='dark' variant='dark'>
          <Container>
            <Navbar.Brand href='/'>Secret Family Recipes</Navbar.Brand>
            <Nav>
              <Nav.Link href='/recipes'>Recipes</Nav.Link>
            </Nav>
            <Nav>
              <Button href='/login'>Login</Button>
              <Button href='/signup'>Signup</Button>
            </Nav>
          </Container>
        </Navbar>
      </header>

      <Routes>
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

      <footer>
        <Container>
          <Row>
            <Col sm={8}>Footer</Col>
            <Col sm={4}></Col>
          </Row>
        </Container>
      </footer>
    </div>
  )
}

export default App;
