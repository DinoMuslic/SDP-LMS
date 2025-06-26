import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";
import BookService from "../../services/book_service";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      const data = await BookService.getBooksInfo();
      setBooks(data);
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title, author, or genre..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row g-4">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book, index) => (
            <div className="col-12 col-lg-4 mb-4" key={index}>
              <BookCard {...book} />
            </div>
          ))
        ) : (
          <div className="text-center text-muted">No books found.</div>
        )}
      </div>
    </div>
  );
};

export default BooksPage;
