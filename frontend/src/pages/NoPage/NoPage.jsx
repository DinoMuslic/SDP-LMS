import { Link } from "react-router-dom";
import "./NoPage.css";

const NoPage = () => {
  return (
    <div className="container d-flex flex-column justify-content-center align-items-center text-center not-found-container">
      <div className="font-xxxl">404</div>
      <div className="font-xl">Oops, Page Not Found!</div>
      <Link to="/home">
        <div className="mt-5">
          <button className="my-btn font-m">HOME</button>
        </div>
      </Link>
    </div>
  );
};

export default NoPage;
