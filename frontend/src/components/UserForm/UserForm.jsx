import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const UserForm = ({ formRef, onSubmit, initialValues = {} }) => {
  const isEdit = !!initialValues.id;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    role: "student",
    password: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({
        ...prev,
        ...initialValues,
        password: "",
      }));
    }
  }, [initialValues]);

  const validate = () => {
    const newErrors = {};
    if (!formData.first_name || formData.first_name.length < 2) {
      newErrors.first_name = "First name must be at least 2 characters.";
    }
    if (!formData.last_name || formData.last_name.length < 2) {
      newErrors.last_name = "Last name must be at least 2 characters.";
    }
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Valid email is required.";
    }
    if (!isEdit && (!formData.password || formData.password.length < 6)) {
      newErrors.password = "Password must be at least 6 characters.";
    }
    if (!["student", "librarian", "admin"].includes(formData.role)) {
      newErrors.role = "Role must be student librarian or admin.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      onSubmit(formData);
    }
  };

  return (
    <>
      <Form ref={formRef} onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>First Name</Form.Label>
          <Form.Control
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            isInvalid={!!errors.first_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.first_name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Last Name</Form.Label>
          <Form.Control
            type="text"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
            isInvalid={!!errors.last_name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.last_name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            isInvalid={!!errors.email}
          />
          <Form.Control.Feedback type="invalid">
            {errors.email}
          </Form.Control.Feedback>
        </Form.Group>

        {/* <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            isInvalid={!!errors.password}
          />
          <Form.Control.Feedback type="invalid">
            {errors.password}
          </Form.Control.Feedback>
        </Form.Group> */}

        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select
            name="role"
            value={formData.role}
            onChange={handleChange}
            isInvalid={!!errors.role}
          >
            <option value="student">Student</option>
            <option value="librarian">Librarian</option>
            <option value="admin">Admin</option>
          </Form.Select>
          <Form.Control.Feedback type="invalid">
            {errors.role}
          </Form.Control.Feedback>
        </Form.Group>

        {!isEdit && (
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              isInvalid={!!errors.password}
            />
            <Form.Control.Feedback type="invalid">
              {errors.password}
            </Form.Control.Feedback>
          </Form.Group>
        )}

        <Button type="submit" className="d-none">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default UserForm;
