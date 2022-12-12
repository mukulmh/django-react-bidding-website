import React, { useState, useEffect } from "react";
import ProductCard from "../components/ProductCard";
import Row from "react-bootstrap/Row";
import BidModal from "../components/BidModal";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";

let Base_URL = "https://drfreactbid.pythonanywhere.com/api";

const HomePage = () => {
  let { user } = useContext(AuthContext);
  const [products, setProducts] = useState([""]);

  useEffect(() => {
    const getProducts = async () => {
      const allProducts = await retrieveProducts();
      if (allProducts) setProducts(allProducts);
    };
    getProducts();
  }, []);

  const retrieveProducts = async () => {
    let response = await fetch(`${Base_URL}/product/item/`, {
      method: "get",
      headers: {
        "Content-Type": "application/json",
      },
    });
    let data = await response.json();
    // console.log(data);
    return data;
  };

  const getProducts = async () => {
    const allProducts = await retrieveProducts();
    if (allProducts) setProducts(allProducts);
  };

  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);

  const placeBid = async (e) => {
    e.preventDefault();
    let product_id = localStorage.getItem("selected");
    let response = await fetch(`${Base_URL}/product/bid/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: e.target.amount.value,
        product: product_id,
        user: user.user_id,
      }),
    });
    if (response.status === 201) {
      alert("Bid Placed!");
      getProducts();
    } else if (response.status === 302) {
      alert("Bid already placed!");
    }
  };

  return (
    <>
      <h2>All Products</h2>
      <Row xs={1} md={4} className="g-4 m-2">
        <ProductCard products={products} handleShow={handleShow} />
      </Row>
      <BidModal show={show} setShow={setShow} placeBid={placeBid} />
    </>
  );
};

export default HomePage;
