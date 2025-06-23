import { useState } from "react";
import MyToast from "@components/Toast/Toast";
import BookService from "@services/book_service";

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");

  const handleBtnClick = async () => {
    setShowToast(false);
    const message = await BookService.isAvailable(title);
    console.log(message);
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <>
      <div className="my-center-container">
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <button onClick={handleBtnClick}>Send</button>
        { showToast ? <MyToast message={toastMessage} type="info" /> : null }
      </div>
    </>
  );
};

export default HomePage;
