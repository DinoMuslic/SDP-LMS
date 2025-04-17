import { useState } from "react";

import LoginForm from "@components/LoginForm/LoginForm";
import MyToast from "@components/Toast/Toast";

import "./LoginPage.css";

const LoginPage = () => {
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [toastType, setToastType] = useState("");
  const [toastTitle, setToastTitle] = useState("");

  return (
    <div className="bg-green d-flex justify-content-center align-items-center min-vh-100 position-relative">
      <LoginForm
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

export default LoginPage;
