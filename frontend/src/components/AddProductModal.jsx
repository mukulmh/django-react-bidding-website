import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const AddProductModal = ({ show, setShow, addProduct }) => {
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 500));
  }

  const handleClose = () => {
    simulateNetworkRequest().then(() => {
      setShow(false);
    });
  };
  const modalClose = () => {
    setShow(false);
  };

  return (
    <>
      <Modal show={show} onHide={modalClose} centered>
        <Modal.Body>
          <Form onSubmit={addProduct}>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                placeholder="enter title"
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                placeholder="enter description"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bidding Amount</Form.Label>
              <Form.Control
                name="amount"
                type="number"
                step="0.01"
                placeholder="enter biding amount"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select aria-label="Default select example" name="category">
                <option selected disabled>
                  Select Category
                </option>
                <option value="Cars">Cars</option>
                <option value="Electronics">Electronics</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ending Time</Form.Label>
              <Form.Control name="ends_at" type="date" />
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
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AddProductModal;
