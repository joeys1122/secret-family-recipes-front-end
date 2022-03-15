import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';

function Login(props) {
  const navigate = useNavigate();
  const [ credentials, setCredentials ] = useState({
    username: '',
    password: ''
  })

  const handleChange = e => {
    setCredentials({
      ...credentials,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = e => {
    e.preventDefault();
    
    axios.post('https://bw50-secret-family-recipes.herokuapp.com/api/auth/login', credentials)
      .then(res => {
        localStorage.setItem('token', res.data.token);
        navigate('/');
      })
      .catch(err => console.log(err.message))
  }

  return(
    <div>
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <label>Username</label>
        <input 
          type='text' 
          name='username' 
          onChange={handleChange} 
          value={credentials.username}
        />
        <label>Password</label>
        <input 
          type='password' 
          name='password' 
          onChange={handleChange} 
          value={credentials.password}
        />
        <button>Login</button>
      </form>
    </div>
  )
}

export default Login;