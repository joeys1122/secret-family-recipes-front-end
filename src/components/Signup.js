import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Container, Form, Button } from 'react-bootstrap';

function Signup(props) {
  const navigate = useNavigate()
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

    axios.post('https://bw50-secret-family-recipes.herokuapp.com/api/auth/register', credentials)
      .then(res => {
        navigate('/login');
      })
      .catch(err => console.log(err.message))
  }

  return(
    <Container className='my-5 pt-5 w-25 m-auto'>
      <Form onSubmit={handleSubmit}>
        <h3 className='text-center mb-3'>Enter Signup Information</h3>
        <Form.Group className='form-floating mb-3'>
          <Form.Control type='text' name='username' onChange={handleChange} value={credentials.username} />
          <Form.Label>Username</Form.Label>
        </Form.Group>
        <Form.Group className='form-floating mb-3'>
          <Form.Control type='password' name='password' onChange={handleChange} value={credentials.password} />
          <Form.Label>Password</Form.Label>
        </Form.Group>
        <Button className="w-100 btn-lg" type='submit'>Signup</Button>
      </Form>
    </Container>
  )
}

export default Signup;