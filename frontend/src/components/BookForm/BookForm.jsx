import { useEffect, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

const BookForm = ({ formRef, onSubmit, initialValues = {} }) => {
  const [imageError, setImageError] = useState("");

  const [formData, setFormData] = useState({
    isbn: "",
    name: "",
    genre: "",
    year_of_publication: "",
    publisher_id: "",
    author_id: "",
    amount: "",
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
    if (!formData.isbn || formData.isbn.length < 1) {
      newErrors.isbn = "ISBN can't be empty.";
    }
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "Title can't be empty";
    }
    if (!formData.amount || formData.amount < 0) {
      newErrors.amount = "Amount must be a positive number.";
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
      const data = new FormData();
      for (const key in formData) {
        if (formData[key] !== undefined && formData[key] !== null) {
          data.append(key, formData[key]);
        }
      }
      onSubmit(data);
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

        <Form.Group className="mb-3">
          <Form.Label>Amount</Form.Label>
          <Form.Control
            type="number"
            name="amount"
            value={formData.amount}
            onChange={handleChange}
            isInvalid={!!errors.amount}
            min="0"
          />
          <Form.Control.Feedback type="invalid">
            {errors.amount}
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Book Cover</Form.Label>
          <Form.Control
            type="file"
            accept="image/*"
            onChange={(e) => {
              const file = e.target.files[0];
              const maxSize = 2 * 1024 * 1024;

              if (file && file.size > maxSize) {
                setImageError("Image must be under 2MB.");
                setFormData((prev) => ({ ...prev, imageFile: null }));
              } else {
                setImageError("");
                setFormData((prev) => ({
                  ...prev,
                  imageFile: file,
                }));
              }
            }}
            isInvalid={!!imageError}
          />
          <Form.Control.Feedback type="invalid">
            {imageError}
          </Form.Control.Feedback>
        </Form.Group>

        {formData.imageFile && (
          <div className="mb-3">
            <img
              src={URL.createObjectURL(formData.imageFile)}
              alt="Preview"
              style={{ maxWidth: "100%", height: "auto", borderRadius: "10px" }}
            />
          </div>
        )}

        <Button type="submit" className="d-none">
          Submit
        </Button>
      </Form>
    </>
  );
};

export default BookForm;
