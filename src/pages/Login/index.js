import React from "react";
import {
  Button,
  Form,
  FormControl,
  FormLabel,
  Row,
  Col,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./style.css";

const Login = () => {
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const navigate = useNavigate();

  const loginApi = (e) => {
    e.preventDefault();

    if (!email || !password) return alert("Plase fill all the details!");

    fetch(process.env.REACT_APP_BASE_URL + "/user", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((data) => {
          if (data.role !== 1)
            return alert("You are not allowed to visit this page!");

          localStorage.setItem("email", email);
          localStorage.setItem("token", data.token);
          localStorage.setItem("name", data.name);

          navigate("/");
        });
      } else if (res.status === 401) alert("Incorrect email or password!");
      else alert("Something went wrong! Please try again.");
    });
  };

  return (
    <div className="auth-canvas">
      <Form className="auth-form" onSubmit={loginApi}>
        <Row>
          <Col
            lg="6"
            md="6"
            sm="12"
            className="d-flex justify-content-center align-items-center"
          >
            <img
              src={require("../../assets/images/logo.png")}
              alt="logo"
              className="logo-img"
            />
          </Col>
          <Col lg="6" md="6" sm="12">
            <div className="mb-3">
              <FormLabel>Email</FormLabel>
              <FormControl
                type="email"
                placeholder="Enter the email"
                name="email"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <FormLabel>Password</FormLabel>
              <FormControl
                type="password"
                placeholder="Enter the password"
                name="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="mb-3 d-flex justify-content-center">
              <Button type="submit">Log In</Button>
            </div>
          </Col>
        </Row>
      </Form>
    </div>
  );
};

export default Login;
