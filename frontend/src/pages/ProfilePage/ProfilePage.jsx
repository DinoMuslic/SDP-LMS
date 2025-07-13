import { useEffect, useState } from "react";
import BorrowService from "@services/borrow_service";
import MyToast from "@components/Toast/Toast";
import UserService from "@services/user_service";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [fines, setFines] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    const fetchFines = async () => {
      const fetchedFines = await BorrowService.calculateStudentFinesProfile(
        localStorage.getItem("id")
      );
      setFines(fetchedFines);
    };
    fetchFines();
  }, []);

  const handlePasswordInput = (e) => {
    setPassword(e.target.value);
  };

  const handleConfirmPasswordInput = (e) => {
    setConfirmPassword(e.target.value);
  };

  const handlePasswordChange = async () => {
    setToastMessage("");
    setShowToast(false);

    if (password === "" || confirmPassword === "") {
      setShowToast(false);
      setTimeout(() => {
        setToastMessage("Password fields cannot be empty");
        setShowToast(true);
      }, 50);
      return;
    }

    if (password !== confirmPassword && password !== "") {
      setShowToast(false);
      setTimeout(() => {
        setToastMessage("Password do not match");
        setShowToast(true);
      }, 50);
      return;
    }

    await UserService.changePassword({id: localStorage.getItem("id"), password: password, confirm_password: confirmPassword});

    setShowToast(false);
    setTimeout(() => {
      setToastMessage("Password changed successfully");
      setShowToast(true);
    }, 50);
  };

  return (
    <div className="profile-center-container p-3">
      <div className="profile-container">
        <div className="text-center c-green h1">User Profile</div>
        <hr /> <br />
        <div className="h3 mb-4">
          Full Name: {localStorage.getItem("full_name")}
        </div>
        <div className="h3">Email: {localStorage.getItem("email")}</div>
        <br />
        <hr />
        <br />
        <div className="password-fine-container">
          <div className="left-side">
            <div className="h3 mb-4">Change Password</div>
            <input
              className="mb-4"
              type="password"
              name="password"
              value={password}
              placeholder="Enter new password"
              onChange={handlePasswordInput}
            />
            <br />
            <input
              className="mb-4"
              type="password"
              name="confirm_password"
              value={confirmPassword}
              placeholder="Confirm new password"
              onChange={handleConfirmPasswordInput}
            />
            <br />
            <button className="my-btn" onClick={handlePasswordChange}>
              Change Password
            </button>
          </div>
          <div className="right-side ms-3">
            <div className="h3 mb-4">Total Fines</div>
            <div className="h4 fine">{fines || 0}</div>
          </div>
          <div></div> <div></div>
        </div>
      </div>
      {showToast ? <MyToast type="info" message={toastMessage} /> : null}
    </div>
  );
};

export default ProfilePage;
