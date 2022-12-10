import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { useContext } from "react";
import AuthContext from "../context/AuthContext";

const AuthModal = ({ show, setShow }) => {
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 2000));
  }
  let {loginUser, registerUser } = useContext(AuthContext);

  const handleClose = () => {
    simulateNetworkRequest().then(() => {
      let user = localStorage.getItem("authTokens");
      if (user) {
        setShow(false);
      }
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
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
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
                    autoFocus
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone No</Form.Label>
                  <Form.Control
                    name="phone"
                    type="number"
                    placeholder="+8801712345678"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    name="fullname"
                    type="text"
                    placeholder="John Doe"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                  />
                </Form.Group>
                <Button
                  variant="secondary"
                  onClick={handleClose}
                  style={{ float: "left" }}
                >
                  Cancel
                </Button>
                <Button
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
