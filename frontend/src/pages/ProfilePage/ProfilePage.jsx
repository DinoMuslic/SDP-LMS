import { useEffect, useState } from "react";
import BorrowService from "@services/borrow_service";
import "./ProfilePage.css";

const ProfilePage = () => {
  const [fines, setFines] = useState(0);

  useEffect(() => {
    const fetchFines = async () => {
      const fetchedFines = await BorrowService.calculateStudentFines(localStorage.getItem("id"));
      setFines(fetchedFines);
    };
    fetchFines();
  }, []);

  return (
    <div className="profile-center-container">
      <div className="profile-container">
        <div className="text-center c-green h1">User Profile</div>
        <hr /> <br />
        <div className="h3 mb-4">Full Name: {localStorage.getItem("full_name")}</div>
        <div className="h3">Email: {localStorage.getItem("email")}</div>
        <br />
        <hr />
        <br />
        <div className="password-fine-container">
          <div className="left-side">
            <div className="h3 mb-4">Reset Password</div>
            <input
              className="mb-4"
              type="password"
              name="password"
              placeholder="Enter new password"
            />
            <br />
            <input
              className="mb-4"
              type="password"
              name="password"
              placeholder="Confirm new password"
            />
            <br />
            <button className="my-btn">Change Password</button>
          </div>
          <div className="right-side">
            <div className="h3 mb-4">Total Fines</div>
            <div className="h4 fine">{fines || 0} KM</div>
          </div>
          <div></div> <div></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
