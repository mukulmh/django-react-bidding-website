import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const AuthModal = ({ show, setShow }) => {
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 500));
  }
  let { loginUser, registerUser } = useContext(AuthContext);

  const handleClose = () => {
    simulateNetworkRequest().then(() => {
      // let user = localStorage.getItem("authTokens");
      setShow(false);
    });
  };

  const modalClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={modalClose}>
        <Modal.Body>
          <Tabs
            defaultActiveKey="sign_in"
            id="justify-tab-example"
            className="mb-3"
            justify
          >
            <Tab eventKey="sign_in" title="Sign In">
              <h3 className="text-center">Sign in with your account</h3>
              <hr />
              <Form onSubmit={loginUser}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                <Button
                  variant="secondary"
                  onClick={modalClose}
                  style={{ float: "left" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleClose}
                  variant="primary"
                  style={{ float: "right" }}
                  type="submit"
                >
                  Sign In
                </Button>
              </Form>
            </Tab>
            <Tab eventKey="sign_up" title="Sign Up">
              <h3 className="text-center">Sign up for your account</h3>
              <hr />
              <Form onSubmit={registerUser}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone No</Form.Label>
                  <Form.Control
                    name="phone"
                    type="number"
                    placeholder="01712345678"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    name="fullname"
                    type="text"
                    placeholder="John Doe"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    name="image"
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                  />
                </Form.Group>
                <Button
                  variant="secondary"
                  onClick={modalClose}
                  style={{ float: "left" }}
                >
                  Cancel
                </Button>
                <Button
                  onClick={handleClose}
                  variant="primary"
                  style={{ float: "right" }}
                  type="submit"
                >
                  Sign Up
                </Button>
              </Form>
            </Tab>
          </Tabs>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AuthModal;
