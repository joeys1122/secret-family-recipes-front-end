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
    <Container className='my-5 pt-5 w-25 m-auto'>
      <Form onSubmit={handleSubmit}>
        <h3 className='text-center mb-3'>Enter Login Information</h3>
        <Form.Group className='form-floating mb-3'>
          <Form.Control id='floatingInput' type='text' name='username' onChange={handleChange} value={credentials.username} />
          <Form.Label for='floatingInput'>Username</Form.Label>
        </Form.Group>
        <Form.Group className='form-floating mb-3'>
          <Form.Control id='floatingInput' type='password' name='password' onChange={handleChange} value={credentials.password} />
          <Form.Label for='floatingInput'>Password</Form.Label>
        </Form.Group>
        <Button className="w-100 btn-lg" type='submit'>Login</Button>
      </Form>
    </Container>
  )
}

export default Login;