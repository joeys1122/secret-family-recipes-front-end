import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

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
    <Container>
      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control type='text' name='username' onChange={handleChange} value={credentials.username} />
        </Form.Group>
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control type='password' name='password' onChange={handleChange} value={credentials.password} />
        </Form.Group>
        <Button variant='primary' type='submit'>Login</Button>
      </Form>
    </Container>
  )
}

export default Login;