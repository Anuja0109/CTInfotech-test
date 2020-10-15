import Axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
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

const SignUp = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [notMatched, setNotMatched] = useState(false);
  const [isNotEmail, setIsNotEmail] = useState(false);
  const [isNotPassword, setIsNotPassword] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
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
      setIsNotEmail({
        isNotEmail: true,
      });
    }
    if (password.length < 6) {
      setIsNotPassword({
        isNotPassword: true,
      });
    }
    if (password !== confirmpassword) {
      setNotMatched({
        notMatched: true,
      });
    }

    if (
      validEmailRegex.test(email) &&
      password.length >= 6 &&
      password === confirmpassword
    ) {
      setIsNotPassword({
        isNotPassword: false,
      });
      setIsError({
        isError: false,
      });
      setIsNotEmail({
        isNotEmail: false,
      });
      setNotMatched({
        notMatched: false,
      });
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
          setIsSuccess({
            isSuccess: true,
          });
        } else {
          setIsError({
            isError: true,
          });
        }
      } catch (error) {
        console.error(error);
      }
    }
  };

  const { email, password, confirmpassword } = formData;
  return (
    <>
      <Header />
      <Container className="App">
        <h2>Sign Up</h2>
        <Form className="signup-form" onSubmit={(e) => onFormSubmit(e)}>
          {isError && (
            <Alert color="danger">
              Bad Request. Invalid Credentials or User may already be present.
            </Alert>
          )}
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
                value={password}
                placeholder="Please Enter a 6 digit password..."
                onChange={(e) => onInputChange(e)}
              />
            </FormGroup>
            {isNotPassword && (
              <Alert color="danger">Please enter 6-digits password.</Alert>
            )}
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
            {notMatched && (
              <Alert color="danger">
                Entered Password and Confirm Password should be same.
              </Alert>
            )}
          </Col>
          <Button color="primary">Sign Up</Button>
        </Form>
        <div>
          <span>
            Don't have an Account ? <Link to="/login">Login</Link>
          </span>
        </div>
        <>
          {isSuccess && (
            <Alert color="success">
              Registered Successfully. Please Login.
            </Alert>
          )}
        </>
      </Container>
    </>
  );
};

export default SignUp;
