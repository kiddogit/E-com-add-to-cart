import axios from 'axios'
import React, { useState } from 'react'
import { Button, Card, Col, Container, Form, InputGroup, Row } from 'react-bootstrap'
import { BsEyeFill, BsEyeSlashFill } from 'react-icons/bs'
import { useNavigate } from 'react-router'

const Login = () => {
  const [userForm, setUserForm] = useState({
    username: '',
    password: ''
  })

  const [showPassword, setShowPassword] = useState(false);

  const ShowHidePassword = () => {
    setShowPassword(!showPassword);
  }

  const navigate = useNavigate('');

  const handleChange = (e) => {
    const { name, value } = e.target;

    setUserForm({ ...userForm, [name]: value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      username: userForm.username,
      password: userForm.password
    }
    axios.post('https://fakestoreapi.com/auth/login', payload)
      .then((res) => {
        if (res.data.token) {
          localStorage.setItem("token", res.data.token);
          navigate('/');
        }
      })
  }

  return (
    <Container className='mt-5' fluid='lg'>
      <Card md={{ span: '10', offset: '1px' }}>
        <Card.Header>
          <Card.Title> User Login </Card.Title>
        </Card.Header>

        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row>
              <Form.Group as={Col} md='6' controlId='username'>
                <Form.Label>Username*</Form.Label>
                <Form.Control
                  required
                  type='text'
                  name='username'
                  value={userForm.username}
                  onChange={handleChange}
                />
              </Form.Group>

              <Form.Group as={Col} md='6' controlId='password'>
                <Form.Label>Password*</Form.Label>
                <InputGroup>
                  <Form.Control
                    required
                    type={showPassword ? 'text' : 'password'}
                    name='password'
                    value={userForm.password}
                    onChange={handleChange}
                  />
                  <InputGroup.Text id='passwordIcon' onClick={ShowHidePassword} >

                    <div style={{ cursor: 'pointer' }}>
                      {showPassword ? <BsEyeSlashFill /> : <BsEyeFill />}
                    </div>
                  </InputGroup.Text>
                </InputGroup>
              </Form.Group>
            </Row>
          </Form>
        </Card.Body>

        <Card.Footer>
          <Button
            className='btn-sm float-end'
            onClick={handleSubmit}
            variant='primary'
            type='submit'
          >
            Login
          </Button>
        </Card.Footer>
      </Card>
    </Container>
  )
}

export default Login;
