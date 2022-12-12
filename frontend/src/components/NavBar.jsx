import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { LinkContainer } from "react-router-bootstrap";
import { useState } from "react";
import AuthModal from "./AuthModal";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function NavBar() {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  let { user, logOutUser } = useContext(AuthContext);
  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container fluid>
          <Navbar.Brand>BIDxBD</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              <LinkContainer to="/">
                <Nav.Link>Home</Nav.Link>
              </LinkContainer>
              {user ? (
                <>
                  <LinkContainer to="/profile">
                    <Nav.Link>Profile</Nav.Link>
                  </LinkContainer>
                  <Nav.Link onClick={logOutUser}>Sign Out</Nav.Link>
                </>
              ) : (
                <Nav.Link onClick={handleShow}>Sign In/Sign Up</Nav.Link>
              )}
            </Nav>
            <Navbar.Text>
              {user && (
                <>
                  Signed in as: <b>{user.fullname}</b>
                </>
              )}
            </Navbar.Text>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <AuthModal show={show} setShow={setShow} />
    </>
  );
}

export default NavBar;
