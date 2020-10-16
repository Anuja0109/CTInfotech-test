import Axios from "axios";
import React, { useState } from "react";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import { connect } from 'react-redux';
import {
  Col,
  Button,
  Form,
  FormGroup,
  Label,
  Input,
  Container,
  Alert,
} from "reactstrap";
import { alertAdded } from '../../store/ui/alerts';

const SignUp = ({ alertAdded }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const onInputChange = (e) =>
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!validEmailRegex.test(email)) {
      alertAdded({ message: "Plaese enter a valid email.", alertType: "danger"});
    }
    if (password.length < 6) {
      alertAdded({ message: "Please enter atleast 6-digit password", alertType: "danger"});
    }
    if (password !== confirmpassword) {
      alertAdded({ message: "Passwords do not Match.", alertType: "danger"});
    }

    if (
      validEmailRegex.test(email) &&
      password.length >= 6 &&
      password === confirmpassword
    ) {
      const newUser = {
        email: email,
        password: password,
      };

      try {
        const config = {
          headers: {
            "Content-Type": "application/json",
          },
        };

        const body = JSON.stringify(newUser);

        const res = await Axios.post("/api/users", body, config);
        console.log(res.status);
        if (res.status === 200) {
          const token = res.data.token;
          localStorage.setItem("token", token);
        } else {
          
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const { email, password, confirmpassword } = formData;
  return (
      <Container className="App">
        <h2>Sign Up</h2>
        <Form className="signup-form" onSubmit={(e) => onFormSubmit(e)}>
          <Col>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="mail"
                value={email}
                placeholder="Enter a Valid email..."
                onChange={(e) => onInputChange(e)}
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
                onChange={(e) => onInputChange(e)}
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
                onChange={(e) => onInputChange(e)}
              />
            </FormGroup>
          </Col>
          <Button color="primary">Sign Up</Button>
        </Form>
        <div>
          <span>
            Don't have an Account ? <Link to="/login">Login</Link>
          </span>
        </div>
      </Container>
  );
};

SignUp.propTypes = {
  alertAdded: PropTypes.func.isRequired,
}

export default connect(null, { alertAdded })(SignUp);
