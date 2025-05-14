import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const BookForm = ({ formRef, onSubmit, initialValues = {} }) => {
  const isEdit = !!initialValues.id;

  const [formData, setFormData] = useState({
    isbn: "",
    name: "",
    genre: "",
    year_of_publication: "",
    publisher_id: "",
    author_id: ""
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
    if (!formData.isbn|| formData.isbn.length < 1) {
        newErrors.isbn = "ISBN can't be empty.";
      }
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Title can't be empty";
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
          <Form.Label>ISBN</Form.Label>
          <Form.Control
            type="text"
            name="isbn"
            value={formData.isbn}
            onChange={handleChange}
            isInvalid={!!errors.isbn}
          />
          <Form.Control.Feedback type="invalid">
            {errors.isbn}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Title</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            isInvalid={!!errors.name}
          />
          <Form.Control.Feedback type="invalid">
            {errors.name}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Genre</Form.Label>
          <Form.Control
            type="text"
            name="genre"
            value={formData.genre}
            onChange={handleChange}
            isInvalid={!!errors.genre}
          />
          <Form.Control.Feedback type="invalid">
            {errors.genre}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Year of Publication</Form.Label>
          <Form.Control
            type="number"
            name="year_of_publication"
            value={formData.year_of_publication}
            onChange={handleChange}
            isInvalid={!!errors.year_of_publication}
          />
          <Form.Control.Feedback type="invalid">
            {errors.year_of_publication}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Publisher ID</Form.Label>
          <Form.Control
            type="number"
            name="publisher_id"
            value={formData.publisher_id}
            onChange={handleChange}
            isInvalid={!!errors.publisher_id}
          />
          <Form.Control.Feedback type="invalid">
            {errors.publisher_id}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Author ID</Form.Label>
          <Form.Control
            type="number"
            name="author_id"
            value={formData.author_id}
            onChange={handleChange}
            isInvalid={!!errors.author_id}
          />
          <Form.Control.Feedback type="invalid">
            {errors.author_id}
          </Form.Control.Feedback>
        </Form.Group>

        <Button type="submit" className="d-none">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default BookForm;
