import { useEffect, useState } from "react";
import BorrowService from "@services/borrow_service";
import MyToast from "@components/Toast/Toast";
import UserService from "@services/user_service";
import { useAuth } from "../../auth/AuthContext";
import "./ProfilePage.css";

const ProfilePage = () => {
  const { user } = useAuth();

  const [fines, setFines] = useState(0);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    if (!user) return;

    const fetchFines = async () => {
      const fetchedFines = await BorrowService.calculateStudentFinesProfile(user.id);
      setFines(fetchedFines);
    };
    fetchFines();
  }, [user]);

  const handlePasswordInput = (e) => setPassword(e.target.value);
  const handleConfirmPasswordInput = (e) => setConfirmPassword(e.target.value);

  const handlePasswordChange = async () => {
    setToastMessage("");
    setShowToast(false);

    if(password.length < 8) {
      setShowToast(true);
      setToastMessage("Password should be atleast 8 characters long");
      return;
    }

    if (!password || !confirmPassword) {
      setShowToast(true);
      setToastMessage("Password fields cannot be empty");
      return;
    }

    if (password !== confirmPassword) {
      setShowToast(true);
      setToastMessage("Passwords do not match");
      return;
    }

    try {
      await UserService.changePassword({ id: user.id, password, confirm_password: confirmPassword });
      setShowToast(true);
      setToastMessage("Password changed successfully");
      setPassword("");
      setConfirmPassword("");
    } catch (error) {
      setShowToast(true);
      setToastMessage("Error changing password");
    }
  };

  if (!user) return <div>Loading...</div>;

  return (
    <div className="profile-center-container p-3">
      <div className="profile-container">
        <div className="text-center c-green h1">User Profile</div>
        <hr /> <br />
        <div className="h3 mb-4">Full Name: {user.full_name}</div>
        <div className="h3">Email: {user.email}</div>
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
        </div>
      </div>
      {showToast && <MyToast type="info" message={toastMessage} />}
    </div>
  );
};

export default ProfilePage;
