import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const AuthorForm = ({ formRef, onSubmit, initialValues = {} }) => {
  const isEdit = !!initialValues.id;

  const [formData, setFormData] = useState({
    first_name: "",
    last_name: "",
    year_of_birth: "",
    year_of_death: "",
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (initialValues) {
      setFormData((prev) => ({
        ...prev,
        ...initialValues,
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
    if (!formData.year_of_birth) {
      newErrors.year_of_birth = "Year of birth is required.";
    }
    if (formData.year_of_death < formData.year_of_birth) {
        newErrors.year_of_death = "Year of death can't be lesser than year of birth.";
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
          <Form.Label>Year of Birth</Form.Label>
          <Form.Control
            type="number"
            name="year_of_birth"
            value={formData.year_of_birth}
            onChange={handleChange}
            isInvalid={!!errors.year_of_birth}
          />
          <Form.Control.Feedback type="invalid">
            {errors.year_of_birth}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Year of Death</Form.Label>
          <Form.Control
            type="number"
            name="year_of_death"
            value={formData.year_of_death}
            onChange={handleChange}
            isInvalid={!!errors.year_of_death}
          />
          <Form.Control.Feedback type="invalid">
            {errors.year_of_death}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="d-none">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default AuthorForm;
