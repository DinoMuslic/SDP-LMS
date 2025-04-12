import { useState } from "react";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import { capitalizeFirstLetter } from "@utils/utils";

import "./MyModal.css";

const MyModal = ({ type, action }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {type === "user" && action === "edit" ? (
        <Modal show={show} onHide={handleClose} centered>
          <Modal.Header closeButton>
            <Modal.Title className="c-green">
              {capitalizeFirstLetter(action)} {capitalizeFirstLetter(type)}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button className="my-btn" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      ) : null}

      <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button>
    </>
  );
};

export default MyModal;
