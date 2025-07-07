import { useEffect, useState } from "react";
import BookCard from "../../components/BookCard/BookCard";
import BookService from "../../services/book_service";

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const booksPerPage = 6;

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true); // start loading
      try {
        const data = await BookService.getBooksInfo();
        setBooks(data);
      } catch (error) {
        console.error("Failed to fetch books", error);
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.genre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = filteredBooks.slice(indexOfFirstBook, indexOfLastBook);
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);

  return (
    <div className="container mt-4">
      <div className="mb-4">
        <input
          type="text"
          className="form-control"
          placeholder="Search by title, author, or genre..."
          value={searchTerm}
          onChange={(e) => {
            setSearchTerm(e.target.value);
            setCurrentPage(1);
          }}
          disabled={loading}
        />
      </div>

      {loading ? (
        <div className="text-center text-muted">Loading books...</div>
      ) : currentBooks.length > 0 ? (
        <div className="row g-4">
          {currentBooks.map((book, index) => (
            <div className="col-12 col-lg-4 mb-4" key={index}>
              <BookCard {...book} />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-muted">No books found.</div>
      )}

      {!loading && totalPages > 1 && (
        <div className="d-flex justify-content-center mt-4">
          <nav>
            <ul className="pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <li
                  key={num}
                  className={`page-item ${currentPage === num ? "active" : ""}`}
                >
                  <button
                    className="page-link"
                    onClick={() => setCurrentPage(num)}
                  >
                    {num}
                  </button>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      )}
    </div>
  );
};

export default BooksPage;
