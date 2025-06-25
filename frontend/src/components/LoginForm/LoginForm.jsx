import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { Form, Container, Button } from "react-bootstrap";

const LoginForm = ({
  setShowToast,
  setToastMessage,
  setToastType,
  setToastTitle,
}) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const navigate = useNavigate();

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email,
          password,
        }
      );

      const { id, first_name, last_name, mail, token, role } = response.data.user;

      localStorage.setItem("id", id);
      localStorage.setItem("full_name", first_name + " " + last_name);
      localStorage.setItem("email", mail);
      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      role === "student"
        ? navigate("/home")
        : role === "admin"
        ? navigate("/dashboard")
        : navigate("/home");
    } catch (error) {
      setToastTitle("Error");
      setToastType("danger");
      setToastMessage(error.response?.data?.error || "Login failed");
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <Form className="p-3 login rounded bg-white">
      <p className="font-l text-center mb-4 mt-4 c-dark-green">Login</p>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Control
          type="email"
          name="email"
          placeholder="Enter your email"
          value={email}
          onChange={handleEmailChange}
          className="pt-3 pb-3 mb-4"
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Control
          type="password"
          name="password"
          placeholder="Enter your password"
          value={password}
          onChange={handlePasswordChange}
          className="pt-3 pb-3 mb-4"
        />
      </Form.Group>

      <Container className="d-flex justify-content-center w-100">
        <Button className="my-btn w-100 font-s" onClick={handleLogin}>
          Login
        </Button>
      </Container>

      <div className="d-flex justify-content-center align-items-center w-100 mt-3">
        <p className="m-0 me-2">Don't have an Account?</p>
        <Button
          variant="link"
          href="/register"
          className="p-0 text-decoration-none c-dark-green"
        >
          Signup
        </Button>
      </div>
    </Form>
  );
};

export default LoginForm;
