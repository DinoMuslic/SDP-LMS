import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "./Header.css";

import libraryLogo from "@images/online-library.png";
import userIcon from "@images/user.png";

const Header = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  return (
    <>
      <Navbar
        className="header mb-5 d-flex justify-content-between"
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
                  <Nav.Link href="/profile">Profile</Nav.Link>
                  <Nav.Link href="/books">Books</Nav.Link>
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
            <div>
              <a onClick={() => localStorage.clear()} href="/home">
                Logout
              </a>
            </div>
          )}
          <Navbar.Brand href="/profile">
            <img className="logo ms-3" src={userIcon} alt="User" />
          </Navbar.Brand>
        </div>
      </Navbar>
    </>
  );
};

export default Header;

{
  /* <>
      {role === "student" ? (
        <Navbar bg="light" data-bs-theme="light">
          <Container className="m-0 mb-4">
            <Navbar.Brand href="/home">Student Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/books">Books</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      ) : role === "admin" ? (
        <Navbar bg="light" data-bs-theme="light">
          <Container className="m-0 mb-4">
            <Navbar.Brand href="#home">Admin Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      ) : role === "librarian" ? (
        <Navbar bg="light" data-bs-theme="light">
          <Container className="m-0 mb-4">
            <Navbar.Brand href="/home">Librarian Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/home">Home</Nav.Link>
              <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      ) : null}
    </> */
}
