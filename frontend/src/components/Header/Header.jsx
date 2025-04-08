import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  const role = localStorage.getItem("role");
  const token = localStorage.getItem("token");

  return (
    <>
      {role === "student" ? (
        <Navbar bg="light" data-bs-theme="light">
          <Container className="m-0 mb-4">
            <Navbar.Brand href="#home">Student Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#books">Books</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      ) : role === "admin" ? (
        <Navbar bg="light" data-bs-theme="light">
          <Container className="m-0 mb-4">
            <Navbar.Brand href="#home">Admin Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#dashboard">Dashboard</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      ) : role === "librarian" ? (
        <Navbar bg="light" data-bs-theme="light">
          <Container className="m-0 mb-4">
            <Navbar.Brand href="#home">Librarian Navbar</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#dashboard">Dashboard</Nav.Link>
            </Nav>
          </Container>
        </Navbar>
      ) : null}
    </>
  );
};

export default Header;
