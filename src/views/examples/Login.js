/*!

=========================================================
* Argon Dashboard React - v1.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/argon-dashboard-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/argon-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React, { useState } from "react";
import { useDispatch } from 'react-redux';
import { login } from "../../redux/actions";

// reactstrap components
import {
  Button,
  Card,
  CardBody,
  FormGroup,
  Form,
  Input,
  InputGroupAddon,
  InputGroupText,
  InputGroup,
  Row,
  Col,
} from "reactstrap";

const Login = () => {
  const [state, setState] = useState({
    email: "",
    password: "",
    submitted: false,
    emailError: false,
  });
  // const [isFocuse, setIsFocused] = useState(false);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { id, value } = e.target;
    var reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    if (id === 'email') {
      if (reg.test(value) == false) {
        setState(prevState => ({
          ...prevState,
          emailError: true,
          [id]: value,
        }));
      } else {
        setState(prevState => ({
          ...prevState,
          emailError: false,
          [id]: value
        }));
      }
    } else {
      setState(prevState => ({
        ...prevState,
        emailError: false,
        [id]: value
      }));
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setState(prevState => ({
      ...prevState,
      submitted: true
    }));
    const { email, password } = state;
    if (email && password) {
      dispatch(login(email, password, (res, errors) => {
        
      }));
    }
  };
  return (
    <>
      <Col lg="5" md="7">
        <Card className="bg-secondary shadow border-0">
          <CardBody className="px-lg-5 py-lg-5">
            <Form role="form">
              <FormGroup className="mb-3">
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-email-83" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="email"
                    autoComplete="new-email"
                    value={state.email}
                    onChange={handleChange}
                    className="form-control"
                    id="email"
                    placeholder="Enter email"
                    name="email"
                    required
                  />
                </InputGroup>
                {
                  state.submitted && !state.email &&
                  <div className="error">Email is required</div>
                }
                {
                  state.emailError &&
                  <div className="error">Please enter valid email.</div>
                }
              </FormGroup>
              <FormGroup>
                <InputGroup className="input-group-alternative">
                  <InputGroupAddon addonType="prepend">
                    <InputGroupText>
                      <i className="ni ni-lock-circle-open" />
                    </InputGroupText>
                  </InputGroupAddon>
                  <Input
                    type="password"
                    autoComplete="new-password"
                    className="form-control"
                    id="password"
                    placeholder="Enter password"
                    name="password"
                    value={state.password}
                    onChange={handleChange}
                    required
                  />
                </InputGroup>
                {
                  state.submitted && !state.password &&
                  <div className="error">Password is required</div>
                }
              </FormGroup>

              <div className="custom-control custom-control-alternative custom-checkbox">
                <input
                  className="custom-control-input"
                  id=" customCheckLogin"
                  type="checkbox"
                />
                <label
                  className="custom-control-label"
                  htmlFor=" customCheckLogin"
                >
                  <span className="text-muted">Remember me</span>
                </label>
              </div>
              <div className="text-center">
                <Button disabled={!(state.password && state.email)} onClick={handleSubmit} className="my-4" color="primary" type="button">
                  Sign in
                </Button>
              </div>
            </Form>
          </CardBody>
        </Card>
        <Row className="mt-3">
          <Col xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Forgot password?</small>
            </a>
          </Col>
          <Col className="text-right" xs="6">
            <a
              className="text-light"
              href="#pablo"
              onClick={(e) => e.preventDefault()}
            >
              <small>Create new account</small>
            </a>
          </Col>
        </Row>
      </Col>
    </>
  );
};

export default Login;
