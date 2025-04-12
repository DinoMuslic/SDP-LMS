import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import MyToast from "@components/Toast/Toast";

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
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/auth/login`,
        {
          email: email,
          password: password,
        }
      );

      const { token, role } = response.data.user;

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      role === "student"
        ? navigate("/home")
        : role === "admin"
        ? navigate("/dashboard")
        : navigate("/librarian");
    } catch (error) {
      setToastTitle("Error");
      setToastType("danger");
      setToastMessage(`${error.response.data.error}`);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 3000);
    }
  };

  return (
    <div className="bg-green d-flex justify-content-center align-items-center min-vh-100 position-relative">
      <Form className="p-3 w-25 rounded bg-white">
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

      {showToast && (
        <MyToast type={toastType} message={toastMessage} title={toastTitle} />
      )}
    </div>
  );
};

export default LoginPage;
