import React, { useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import Header from "../layout/Header";
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

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
  });

  const [isNotEmail, setIsNotEmail] = useState(false);
  const [isNotPassword, setIsNotPassword] = useState(false);
  const validEmailRegex = RegExp(
    /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
  );

  const onInputChange = (e) =>
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });

  const onFormSubmit = async (e) => {
    e.preventDefault();
    if (!validEmailRegex.test(state.email)) {
      setIsNotEmail({
        isNotEmail: true,
      });
    }
    if (state.password.length < 6) {
      setIsNotPassword({
        isNotPassword: true,
      });
    }

    if (validEmailRegex.test(state.email) && state.password.length >= 6) {
      setIsNotPassword({
        isNotPassword: false,
      });
      setIsNotEmail({
        isNotEmail: false,
      });

      const user = {
        email: state.email,
        password: state.password,
      };

      const token = localStorage.getItem("token");
      // console.log(token);
      if (token) {
        try {
          const config = {
            headers: {
              "Content-Type": "application/json",
              "x-auth-token": token,
            },
          };

          const body = JSON.stringify(user);

          const res = await Axios.post("/api/auth", body, config);
          console.log(res);
        } catch (error) {
          console.error(error.res);
        }
      }
    }
  };
  return (
    <>
      <Header />
      <Container className="login">
        <h2>Login</h2>
        <Form className="login-form" onSubmit={(e) => onFormSubmit(e)}>
          <Col>
            <FormGroup>
              <Label for="email">Email</Label>
              <Input
                type="email"
                name="email"
                id="email"
                value={state.email}
                placeholder="Enter email..."
                onChange={(e) => onInputChange(e)}
              />
            </FormGroup>
            {isNotEmail && (
              <Alert color="danger">Please Enter a Valid Email.</Alert>
            )}
          </Col>
          <Col>
            <FormGroup>
              <Label for="password">Password</Label>
              <Input
                type="password"
                name="password"
                id="password"
                value={state.password}
                placeholder="Please Enter your password..."
                onChange={(e) => onInputChange(e)}
              />
            </FormGroup>
            {isNotPassword && (
              <Alert color="danger">Please enter correct password.</Alert>
            )}
          </Col>
          <Button color="primary">Login</Button>
        </Form>
        <div>
          <span>
            Don't have an Account ? <Link to="/signup">Sign Up</Link>
          </span>
        </div>
      </Container>
    </>
  );
};

Login.propTypes = {};

export default Login;
