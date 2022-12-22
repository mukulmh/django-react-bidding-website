import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { useContext, useState } from "react";
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

  let doLogin = async(e) => {
    e.preventDefault()
    let user = {
      email: e.target.email.value,
      password: e.target.password.value,
    }
    const res = await loginUser(user)
    if (res.status === 200){
      modalClose()
    }
  }

  const [state, setState] = useState({
    email: "",
    phone: "",
    fullname: "",
    password: "",
    image: null,
  });

  const handleChange = (e) => {
    let newState = { ...state };
    newState[e.target.name] = e.target.value;
    setState(newState);
  };

  const handleImageChange = (e) => {
    let newState = { ...state };
    newState["image"] = e.target.files[0];
    setState(newState);
  };

  const doRegistration = async(e) => {
    e.preventDefault();
    console.log(state);
    const response = await registerUser(state);
    if ( response.status === 201){
      modalClose()
    }
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
              <Form onSubmit={doLogin}>
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
              <Form onSubmit={doRegistration}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    name="email"
                    type="email"
                    placeholder="name@example.com"
                    required
                    autoFocus
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Phone No</Form.Label>
                  <Form.Control
                    name="phone"
                    type="number"
                    placeholder="01712345678"
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Full Name</Form.Label>
                  <Form.Control
                    name="fullname"
                    type="text"
                    placeholder="John Doe"
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    name="password"
                    type="password"
                    placeholder="Password"
                    required
                    onChange={handleChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    name="image"
                    type="file"
                    accept="image/jpeg,image/png,image/gif"
                    onChange={handleImageChange}
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
