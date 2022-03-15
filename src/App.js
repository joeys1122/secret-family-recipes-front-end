import './App.css';
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

import Login from './components/Login';
import Signup from './components/Signup';

function App() {
  return(
    <Router>
      <div className="App">
        <nav>
          <h1>Secret Family Recipes</h1>
          <Link to='/login'>Login</Link>
          <Link to='/signup'>Signup</Link>
        </nav>

        <Routes>
          <Route exact path='/login' element={<Login/>}/>
          <Route exact path='/signup' element={<Signup/>}/>
          <Route exact path='/' element={<h1>Home</h1>}/>
        </Routes>
      </div>
    </Router>
  )
}

export default App;
