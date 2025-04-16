import React from 'react';
import { Modal, Button } from 'react-bootstrap';

const DeleteModal = ({ show, onClose, onDelete, entity }) => {
  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Delete {entity}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        Are you sure you want to delete {entity}?
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="danger" onClick={onDelete}>
          Delete
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default DeleteModal;
