import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import {
    Col,
    Button,
    Form,
    FormGroup,
    Label,
    Input,
    Container
  } from "reactstrap";


const Login = () => {
  const [formData, setFormData ] = useState({
    email: '',
    password: ''
  });

  const onInputChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  const onFormSubmit = async e => {
    e.preventDefault();
      const user = {
        email,
        password
      }

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

        const body = JSON.stringify(user);

        const res = await Axios.post('/api/auth', body, config);
        console.log(res);
      } catch (error) {
        console.error(error.res);
      }
  }
    return (
        <Container className="App">
        <h2>Login</h2>
        <Form className="login-form" onSubmit={e=> onFormSubmit(e)}>
        <Col>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={email}
                placeholder="Enter email..."
                onChange={e => onInputChange(e)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={password}
                placeholder="Please Enter your password..."
                onChange={e => onInputChange(e)}
              />
            </FormGroup>
          </Col>
          <Button color="primary">Login</Button>
        </Form>
        <div>
          <span>Don't have an Account ? <Link to='/signup'>Sign Up</Link></span>
          </div>
      </Container>
    );
}

export default Login;