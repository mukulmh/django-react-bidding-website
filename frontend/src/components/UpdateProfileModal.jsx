import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

let Base_URL = "http://127.0.0.1:8000/api";

const UpdateProfileModal = ({
  showProfileModal,
  setShowProfileModal,
  userInfo,
  getInfo,
}) => {
  const modalClose = () => {
    setShowProfileModal(false);
  };

  const updateProfile = async (e) => {
    e.preventDefault();
    let user = {
      email: e.target.email.value,
      phone: e.target.phone.value,
      fullname: e.target.fullname.value,
    };
    await axios
      .post(`${Base_URL}/auth/profile/${userInfo.id}/`, user, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then(function (response) {
        console.log(response);
        modalClose();
        getInfo();
        alert(response.data.msg);
      })
      .catch(function (error) {
        console.log(error.response);
        alert(error.response.data.msg);
        return error.response;
      });
  };

  return (
    <>
      <Modal show={showProfileModal} onHide={modalClose} centered>
        <Modal.Body>
          <Form onSubmit={updateProfile}>
            <Form.Control name="product_id" type="hidden" defaultValue="" />
            <Form.Group className="mb-3">
              <Form.Label>Fullname</Form.Label>
              <Form.Control
                name="fullname"
                type="text"
                defaultValue={userInfo.fullname}
                autoFocus
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control
                name="email"
                type="text"
                defaultValue={userInfo.email}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                name="phone"
                type="number"
                defaultValue={userInfo.phone}
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
            <Button variant="primary" style={{ float: "right" }} type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateProfileModal;
