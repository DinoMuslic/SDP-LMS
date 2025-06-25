import { useRef } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import UserForm from "@components/UserForm/UserForm";
import BookForm from "@components/BookForm/BookForm";
import AuthorForm from "@components/AuthorForm/AuthorForm";
import PublisherForm from "@components/PublisherForm/PublisherForm";

import { capitalizeFirstLetter } from "@utils/utils";

const MyModal = ({
  show,
  type,
  action,
  handleClose,
  initialData,
  onFormSubmit,
}) => {
  const formRef = useRef();

  const handleSaveChanges = () => {
    if (formRef.current) {
      formRef.current.dispatchEvent(
        new Event("submit", { cancelable: true, bubbles: true })
      );
    }
  };

  const renderForm = () => {
    const commonProps = {
      formRef,
      onSubmit: (data) => {
        onFormSubmit(data);
        handleClose();
      },
      initialValues: initialData,
    };

    switch (type) {
      case "user":
        return <UserForm {...commonProps} />;
      case "book":
        return <BookForm {...commonProps} />;
      case "author":
        return <AuthorForm {...commonProps} />;
      case "publisher":
        return <PublisherForm {...commonProps} />;
      default:
        return null;
    }
  };

  return (
    <Modal show={show} onHide={handleClose} centered>
      <Modal.Header closeButton>
        <Modal.Title className="c-green">
          {capitalizeFirstLetter(action)} {capitalizeFirstLetter(type)}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>{renderForm()}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button className="my-btn" onClick={handleSaveChanges}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default MyModal;
