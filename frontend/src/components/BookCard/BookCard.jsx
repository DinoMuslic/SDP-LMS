import "./BookCard.css";

const BookCard = (props) => {
  const isAvailable = props.amount;
  let border = isAvailable > 0 ? "border-green" : "border-red";
  let borderTop = isAvailable > 0 ? "border-top-green" : "border-top-red";

  return (
    <div className={`book-container p-0 m-0 mt-5 ${border}`}>
      <div className="img-container">
        <img
          className="author-img"
          src={
            props.image
              ? `${import.meta.env.VITE_API_URL}/books/image/${props.isbn}`
              : "/src/public/no_image.svg"
          }
          alt="book"
          loading="lazy"
        />
      </div>
      <div className={`info-container ${borderTop}`}>
        <div className="text-center h3">{props.title}</div>
        <div className="text-center text-secondary h5 mb-4">{props.author}</div>
        <div className="mb-1">
          <b>Genre: </b>
          {props.genre}
        </div>
        <div className="mb-3">
          <b>Publisher: </b>
          {props.publisher} ({props.yob})
        </div>
        <div className="text-justify">{props.description}</div>
      </div>
    </div>
  );
};

export default BookCard;
