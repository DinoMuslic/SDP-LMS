import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";

import MyToast from "@components/Toast/Toast";

import "./RegisterPage.css";

const RegisterPage = () => {
  const [firstName, setFirsName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [toastTitle, setToastTitle] = useState("");

  const [formErrors, setFormErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleFirstNameChange = (e) => setFirsName(e.target.value);
  const handleLastNameChange = (e) => setLastName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleConfirmPasswordChange = (e) => setConfirmPassword(e.target.value);

  const navigate = useNavigate();

  const validateForm = () => {
    const errors = {};

    if (!firstName) errors.firstName = "First Name is required";
    if (!lastName) errors.lastName = "Last Name is required";
    if (!email) errors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) errors.email = "Email is invalid";
    if (!password) errors.password = "Password is required";
    else if (password.length < 8)
      errors.password = "Password must be at least 8 characters";
    if (password !== confirmPassword)
      errors.confirmPassword = "Passwords do not match";

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleRegister = async (event) => {
    event.preventDefault();

    if (!validateForm()) return;

    try {
      await axios.post(`${import.meta.env.VITE_API_URL}/auth/register`, {
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
      });
      setToastTitle("Success");
      setToastType("success");
      setToastMessage("Successfully Registered");
      setShowToast(true);
      setTimeout(() => navigate("/login"), 1000);
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
      <Form className="bg-white p-3 register rounded needs-validation">
        <p className="font-l text-center mb-4 mt-4 c-dark-green">Register</p>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="first_name"
            placeholder="Enter your first name"
            value={firstName}
            onChange={handleFirstNameChange}
            required
            isInvalid={!!formErrors.firstName}
            className="pt-3 pb-3 mb-4"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.firstName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="text"
            name="last_name"
            placeholder="Enter your last name"
            value={lastName}
            onChange={handleLastNameChange}
            required
            isInvalid={!!formErrors.lastName}
            className="pt-3 pb-3 mb-4"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.lastName}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={handleEmailChange}
            required
            isInvalid={!!formErrors.email}
            className="pt-3 pb-3 mb-4"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.email}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            name="password"
            placeholder="Create a password"
            value={password}
            onChange={handlePasswordChange}
            required
            isInvalid={!!formErrors.password}
            className="pt-3 pb-3 mb-4"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.password}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Control
            type="password"
            name="confirmPassword"
            placeholder="Confirm your password"
            value={confirmPassword}
            onChange={handleConfirmPasswordChange}
            required
            isInvalid={!!formErrors.confirmPassword}
            className="pt-3 pb-3 mb-4"
          />
          <Form.Control.Feedback type="invalid">
            {formErrors.confirmPassword}
          </Form.Control.Feedback>
        </Form.Group>

        <Container className="d-flex justify-content-center w-100">
          <Button className="my-btn w-100 font-s" onClick={handleRegister}>
            Signup
          </Button>
        </Container>

        <div className="d-flex justify-content-center align-items-center w-100 mt-3">
          <p className="m-0 me-2">Already have an Account?</p>
          <Button
            variant="link"
            href="/login"
            className="p-0 text-decoration-none c-dark-green"
          >
            Login
          </Button>
        </div>
      </Form>

      {showToast && (
        <MyToast type={toastType} message={toastMessage} title={toastTitle} />
      )}
    </div>
  );
};

export default RegisterPage;
