import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

function ProductCard({ products, handleShow }) {
  return products.map((product, index) => (
    <>
      <Col key={index}>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
              Starting Bid: {product.starting_bid} <br />
              Highest Bidder: {product.highest_bidder} <br />
              Total Bids: {product.total_bids} <br />
              Ends At: {product.ends_at} <br />
            </Card.Text>
            <Button
              variant="outline-primary"
              size="sm"
              style={{ float: "left" }}
              onClick={() => {
                localStorage.setItem("selected",product.id)
                handleShow();
              }}
            >
              Place your Bid
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </>
  ));
}

export default ProductCard;
