import Axios from "axios";
import React, { useState } from "react";
// import PropTypes from "prop-types";
import { Link } from 'react-router-dom';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container
} from "reactstrap";

// SignUp.propTypes = {};

const SignUp = (props) => {
  const [formData, setFormData ] = useState({
    email: '',
    password: '',
    confirmpassword: ''
  });

  const onInputChange = e => setFormData({
    ...formData,
    [e.target.name]: e.target.value
  });

  // const onImageUpload = async e => {
  //   const formData = new FormData();
  //   formData.append('avatar', e.target.files[0]);
  //   console.log();
  //   const res = await Axios.post(`/api/users/profile/photo`, formData, {
  //     headers: { 'content-type': 'multipart/form-data'}
  //  });
  //  console.log(res);
  // };

  const onFormSubmit = async e => {
    e.preventDefault();
    // console.log(avatar);
    if(password !== confirmpassword) {
      console.log("Please Enter same password");
    }
    else {
      const newUser = {
        email: email,
        password: password
      }

      try {
        const config = {
          headers: {
            'Content-Type': 'application/json'
          }
        }

        const body = JSON.stringify(newUser);

        const res = await Axios.post('/api/users', body, config);
        console.log(res.data.token);
        const token = res.data.token;
        localStorage.setItem('token', token);
      } catch (error) {
        console.error(error.res);
      }
    }
  }

  const { email, password, confirmpassword } = formData;
  return (
    <Container className="App">
        <h2>Sign Up</h2>
        <Form className="signup-form" onSubmit={e=> onFormSubmit(e)}>
          <Col>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="mail"
                value={email}
                placeholder="Enter a Valid email..."
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
                placeholder="Please Enter a 6 digit password..."
                onChange={e => onInputChange(e)}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              <Label for="confirmpassword">Confirm Password</Label>
              <Input
                type="password"
                name="confirmpassword"
                id="confirmpassword"
                value={confirmpassword}
                placeholder="Please Enter a 6 digit password..."
                onChange={e => onInputChange(e)}
              />
            </FormGroup>
          </Col>
          {/* <Col>
    
        <Label for="avatar">Upload DP</Label>
        <Input type="file" name="avatar" id="avatar" onChange={e=> onImageUpload(e)} />
        </Col> */}
          <Button color="primary">Sign Up</Button>
      </Form>
      <div>
          <span>Don't have an Account ? <Link to='/login'>Login</Link></span>
          </div>
      </Container>
  );
};

export default SignUp;
