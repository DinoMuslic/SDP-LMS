import React, { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Toast from "react-bootstrap/Toast";

const MyToast = ({ title, type, message }) => {
  const [show, setShow] = useState(true);

  const [hr, setHr] = useState();
  const [min, setMin] = useState();
  const [sec, setSec] = useState();

  useEffect(() => {
    const date = new Date();
    setHr(date.getHours());
    setMin(date.getMinutes());
    setSec(date.getSeconds());
  });

  const displayCurrentTime = () => {
    return (
      String(hr).padStart(2, "0") +
      ":" +
      String(min).padStart(2, "0") +
      ":" +
      String(sec).padStart(2, "0")
    );
  };

  return (
    <Toast
      onClose={() => setShow(false)}
      show={show}
      delay={3000}
      autohide
      bg={type}
      className="position-absolute top-0 end-0 mt-3 me-3"
    >
      <Toast.Header>
        <img src="holder.js/20x20?text=%20" className="rounded me-2" alt="" />
        <strong className="me-auto">{title}</strong>
        <small>{displayCurrentTime()}</small>
      </Toast.Header>
      <Toast.Body className="text-light">{message}</Toast.Body>
    </Toast>
  );
};

export default MyToast;
