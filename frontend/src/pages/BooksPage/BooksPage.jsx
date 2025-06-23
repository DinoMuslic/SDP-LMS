import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";
import BookService from "../../services/book_service";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  useEffect(() => {
    const fetchBooks = async () => {
      const data = await BookService.getBooksInfo();
      setBooks(data);
    }
    fetchBooks();
  }, []);

  return (
    <div className="container">
      <div className="row g-4">
        {books.map((book, index) => (
          <div className="col-12 col-lg-4 mb-4" key={index}>
            <BookCard {...book} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
