import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const UpdateProductModal = ({
  showUpdateModal,
  setShowUpdateModal,
  updateProduct,
  temp,
}) => {
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 500));
  }

  const handleClose = () => {
    simulateNetworkRequest().then(() => {
      setShowUpdateModal(false);
    });
  };
  const modalClose = () => {
    setShowUpdateModal(false);
  };

  return (
    <>
      <Modal show={showUpdateModal} onHide={modalClose} centered>
        <Modal.Body>
          <Form onSubmit={updateProduct}>
            <Form.Control
              name="product_id"
              type="hidden"
              defaultValue={temp.id}
            />
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                name="title"
                type="text"
                defaultValue={temp.title}
                autoFocus
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                name="description"
                type="text"
                defaultValue={temp.description}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Bidding Amount</Form.Label>
              <Form.Control
                name="amount"
                type="number"
                step="0.01"
                defaultValue={temp.biding_price}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Select aria-label="Default select example" name="category">
                <option selected disabled value="">
                  Select Category
                </option>
                <option value="Cars">Cars</option>
                <option value="Electronics">Electronics</option>
                <option value="Others">Others</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Ending Time</Form.Label>
              <Form.Control
                name="ends_at"
                type="date"
                defaultValue={temp.ends_at}
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
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default UpdateProductModal;
