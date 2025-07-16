import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { NavLink, useNavigate } from "react-router-dom";

import "./Header.css";
import libraryLogo from "@images/online-library.png";
import { useAuth } from "../../auth/AuthContext";
import { getFrontendUrl } from "@utils/utils";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const role = user?.role;

  const handleLogout = () => {
    logout();
    navigate("/home");
  };

  return (
    <Navbar className="header d-flex justify-content-between" data-bs-theme="light">
      <Container className="m-0">
        <div className="d-flex align-items-center">
          <Navbar.Brand as={NavLink} to="/home">
            <img className="logo" src={libraryLogo} alt="Logo" />
          </Navbar.Brand>
          <Nav className="me-auto">
            {role === "student" ? (
              <>
                <Nav.Link as={NavLink} to={getFrontendUrl() + "/home"}>Home</Nav.Link>
                <Nav.Link as={NavLink} to={getFrontendUrl() + "/books"}>Books</Nav.Link>
                <Nav.Link as={NavLink} to="/profile">Profile</Nav.Link>
              </>
            ) : role === "admin" ? (
              <>
                <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/books">Books</Nav.Link>
                <Nav.Link as={NavLink} to="/dashboard">Dashboard</Nav.Link>
              </>
            ) : role === "librarian" ? (
              <>
                <Nav.Link as={NavLink} to="/home">Home</Nav.Link>
                <Nav.Link as={NavLink} to="/books">Books</Nav.Link>
                <Nav.Link as={NavLink} to="/borrowings">Borrowings</Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link as={NavLink} to="/login">Login</Nav.Link>
                <Nav.Link as={NavLink} to="/register">Register</Nav.Link>
              </>
            )}
          </Nav>
        </div>
      </Container>
      <div className="d-flex align-items-center text-light">
        {role && (
          <Nav.Link
            href="#logout"
            className="text-light me-5"
            onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}
          >
            Logout
          </Nav.Link>
        )}
      </div>
    </Navbar>
  );
};

export default Header;
