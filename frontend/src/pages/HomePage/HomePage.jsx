import { useState } from "react";
import MyToast from "@components/Toast/Toast";
import BookService from "@services/book_service";

import "./HomePage.css";

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleBtnClick = async () => {
    setShowToast(false);
    const message = await BookService.isAvailable(title);
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <>
      <div className="my-center-container">
        <div className="h2 c-green">
          Check if the Book you want to read is available
        </div>
        <div>
          <input
            className="book-availability-input mt-5"
            type="text"
            placeholder="Enter Book Title"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <button className="my-btn" onClick={handleBtnClick}>
            Check
          </button>
        </div>
        {showToast ? <MyToast message={toastMessage} type="info" /> : null}
      </div>
    </>
  );
};

export default HomePage;
