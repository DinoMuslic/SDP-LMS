import BookCard from "../../components/BookCard/BookCard";

import books from "../../data/books.json";

const BooksPage = () => {
  console.log(books[0].yearOfPublishing);

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
