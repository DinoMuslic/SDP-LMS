import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import RegisterForm from "@components/RegisterForm/RegisterForm";
import MyToast from "@components/Toast/Toast";

import "./RegisterPage.css";

const RegisterPage = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [toastTitle, setToastTitle] = useState("");

  return (
    <div className="bg-green d-flex justify-content-center align-items-center min-vh-100 position-relative">
      <RegisterForm
        setShowToast={setShowToast}
        setToastMessage={setToastMessage}
        setToastType={setToastType}
        setToastTitle={setToastTitle}
      />
      {showToast && (
        <MyToast type={toastType} message={toastMessage} title={toastTitle} />
      )}
    </div>
  );
};

export default RegisterPage;
