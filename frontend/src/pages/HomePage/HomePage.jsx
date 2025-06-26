import { useEffect, useState } from "react";
import MyToast from "@components/Toast/Toast";
import BookCard from "@components/BookCard/BookCard";
import BookService from "@services/book_service";

import "./HomePage.css";

const HomePage = () => {
  const [title, setTitle] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [books, setBooks] = useState([]);

  useEffect(() => {
    const fetchBooks = async () => {
      const fetchedBooks = await BookService.getTopBorrowed();
      setBooks(fetchedBooks);
    };
    fetchBooks();
  }, []);

  const handleBtnClick = async () => {
    setShowToast(false);
    const message = await BookService.isAvailable(title);
    setToastMessage(message);
    setShowToast(true);
  };

  return (
    <>
      <div className="container mt-5">
        <div className="h2 c-green">
          Check if the Book you want to read is available
        </div>
        <div className="mb-5">
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
        <div className="h2 c-green">Top borrowed Books</div>
        <div className="row g-4">
          {books.map((book, index) => (
            <div className="col-12 col-lg-4 mb-4" key={index}>
              <BookCard {...book} />
            </div>
          ))}
        </div>
        {showToast ? <MyToast message={toastMessage} type="info" /> : null}
      </div>  
    </>
  );
};

export default HomePage;
