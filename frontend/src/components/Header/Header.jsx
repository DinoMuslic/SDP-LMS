import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "./Header.css";

import libraryLogo from "@images/online-library.png";
import userIcon from "@images/user.png";

const Header = () => {
  const role = localStorage.getItem("role");

  return (
    <>
      <Navbar
        className="header d-flex justify-content-between"
        data-bs-theme="light"
      >
        <Container className="m-0">
          <div className="d-flex align-items-center">
            <Navbar.Brand href="/home">
              <img className="logo" src={libraryLogo} alt="Logo" />
            </Navbar.Brand>
            <Nav className="me-auto">
              {role === "student" ? (
                <>
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/books">Books</Nav.Link>
                  <Nav.Link href="/profile">Profile</Nav.Link>
                </>
              ) : role === "admin" ? (
                <>
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </>
              ) : role === "librarian" ? (
                <>
                  <Nav.Link href="/home">Home</Nav.Link>
                  <Nav.Link href="/dashboard">Dashboard</Nav.Link>
                </>
              ) : (
                <>
                  <Nav.Link href="/login">Login</Nav.Link>
                  <Nav.Link href="/register">Register</Nav.Link>
                </>
              )}
            </Nav>
          </div>
        </Container>
        <div className="d-flex align-items-center text-light">
          {role && (
            <>
              <Nav.Link
                href="/home"
                className="text-light"
                onClick={() => {
                  localStorage.removeItem("role");
                  localStorage.removeItem("token");
                }}
              >
                Logout
              </Nav.Link>

              <Nav.Link href="/profile">
                <img className="logo ms-4 me-2" src={userIcon} alt="User" />
              </Nav.Link>
            </>
          )}
        </div>
      </Navbar>
    </>
  );
};

export default Header;
