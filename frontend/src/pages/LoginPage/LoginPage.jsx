import { useState } from "react";
import { data, useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import MyToast from "@components/Toast/Toast";

import "./LoginPage.css";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [toastTitle, setToastTitle] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_API_URL}/auth/login`, {
        email: email,
        password: password,
      });

      const { token, role } = response.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      role === "student" ? navigate("/") : role === "admin" ? navigate("/admin") : navigate("/librarian") ;
    } catch (error) {
      setToastTitle("Error");
      setToastType("danger");
      setToastMessage(`${error.response.data.error}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 position-relative">
      <Form className="login-form p-3 w-25 rounded">
        <p className="h4 text-center">Login</p>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter email"
            value={email}
            onChange={handleEmailChange}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="Password"
            value={password}
            onChange={handlePasswordChange}
          />
        </Form.Group>

        <Container className="d-flex justify-content-center w-100">
          <Button variant="success" onClick={handleLogin}>
            Login
          </Button>
        </Container>
      </Form>

      {showToast && (
        <MyToast type={toastType} message={toastMessage} title={toastTitle} />
      )}
    </div>
  );
};

export default LoginPage;
