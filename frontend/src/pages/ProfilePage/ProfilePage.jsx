import "./ProfilePage.css";

const ProfilePage = () => {
  return (
    <div className="profile-center-container">
      <div className="profile-container">
        <div className="text-center c-green h1">User Profile</div>
        <hr /> <br />
        <div className="h3 mb-4">Full Name: ${}</div>
        <div className="h3">Email: ${}</div>
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
            <div className="h4 fine">0 KM</div>
          </div>
          <div></div> <div></div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
