import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";
import { Link } from "react-router-dom";

function ProductCard({ products, handleShow }) {
  let { user } = useContext(AuthContext);
  return products.map((product, index) => (
    <>
      <Col key={index}>
        <Card>
          <Card.Img variant="top" src="holder.js/100px160" />
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
              Starting Bid: ${product.starting_bid} <br />
              Highest Bidder: {product.highest_bidder} <br />
              Highest Bid: ${product.highest_bid} <br />
              Total Bids: {product.total_bids} <br />
              Ends At: {product.ends_at} <br />
            </Card.Text>
            {user ? (
              <>
                {user.user_id !== product.created_by ? (
                  <Button
                    variant="outline-primary"
                    size="sm"
                    style={{ float: "left" }}
                    onClick={() => {
                      localStorage.setItem("selected", product.id);
                      handleShow();
                    }}
                  >
                    Place your Bid
                  </Button>
                ) : (
                  <Link to="/profile">
                    <Button
                      variant="outline-success"
                      size="sm"
                      style={{ float: "left" }}
                    >
                      View in Profile
                    </Button>
                  </Link>
                )}
              </>
            ) : (
              ""
            )}
          </Card.Body>
        </Card>
      </Col>
    </>
  ));
}

export default ProductCard;
