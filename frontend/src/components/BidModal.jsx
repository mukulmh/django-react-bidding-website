import React from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";

const BidModal = ({ show, setShow, placeBid }) => {
  function simulateNetworkRequest() {
    return new Promise((resolve) => setTimeout(resolve, 500));
  }

  const handleClose = () => {
    simulateNetworkRequest().then(() => {
      setShow(false);
    });
  };
  return (
    <>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Body>
          <Form onSubmit={placeBid}>
            <Form.Group className="mb-3">
              <Form.Label>Bidding Amount</Form.Label>
              <Form.Control
                name="amount"
                type="number"
                step="0.01"
                placeholder="enter amount"
                autoFocus
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
            //   onClick={placeBid}
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

export default BidModal;
