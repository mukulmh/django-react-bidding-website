import React, { useState, useEffect, useContext } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import Button from "react-bootstrap/Button";

import AuthContext from "../context/AuthContext";
import AddProductModal from "../components/AddProductModal";
import UpdateProductModal from "../components/UpdateProductModal";
let Base_URL = "http://localhost:8000/api"

const ProfilePage = () => {
  let { user } = useContext(AuthContext);
  const [userInfo, setUserInfo] = useState([""]);
  const [products, setProducts] = useState([""]);
  const [bids, setBids] = useState([""]);
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const handleUpdateModal = () => setShowUpdateModal(true);
  const [temp, setTemp] = useState([""]);

  useEffect(() => {
    const getUserInfo = async () => {
      const info = await retrieveUserInfo();
      if (info) {
        setUserInfo(info.user);
        setProducts(info.products);
        setBids(info.bids);
      }
    };
    getUserInfo();
  }, []);

  const retrieveUserInfo = async () => {
    let response = await fetch(
      `${Base_URL}/auth/profile/${user.user_id}`,
      {
        method: "get",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    let data = await response.json();
    console.log(data);
    return data;
  };

  const getInfo = async () => {
    const info = await retrieveUserInfo();
    if (info) {
      setUserInfo(info.user);
      setProducts(info.products);
      setBids(info.bids);
    }
  };

  const addProduct = async (e) => {
    e.preventDefault();
    let response = await fetch(`${Base_URL}/product/item/`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: e.target.title.value,
        description: e.target.description.value,
        created_by: user.user_id,
        category: e.target.category.value,
        biding_price: e.target.amount.value,
        ends_at: e.target.ends_at.value,
      }),
    });
    if (response.status === 201) {
      alert("Product added!");
      getInfo();
    } else {
      alert("something went wrong!");
    }
  };

  const updateProduct = async (e) => {
    e.preventDefault();
    let response = await fetch(
      `${Base_URL}/product/item/${e.target.product_id.value}/`,
      {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: e.target.title.value,
          description: e.target.description.value,
          created_by: user.user_id,
          category: e.target.category.value,
          biding_price: e.target.amount.value,
          ends_at: e.target.ends_at.value,
        }),
      }
    );
    if (response.status === 200) {
      alert("Product updated!");
      getInfo();
    } else {
      alert("something went wrong!");
    }
  };

  const deleteProduct = async (id) => {
    let response = await fetch(
      `${Base_URL}/product/item/${id}/`,
      {
        method: "delete",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    if (response.status === 204) {
      alert("Product deleted!");
      getInfo();
    } else {
      alert("something went wrong!");
    }
  };

  return (
    <>
      <h2>ProfilePage</h2>
      <Row className="g-4 m-2">
        <Col xs={6} md={3}>
          <Card>
            <Card.Img variant="top" src="#" />
            <Card.Body>
              <Card.Title>{userInfo.fullname}</Card.Title>
              <Card.Text>{userInfo.email} <br /> {userInfo.phone}</Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={12} md={9}>
          <Card>
            <Tabs
              defaultActiveKey="products"
              id="justify-tab-example"
              className="mb-3 text-center"
              justify
            >
              <Tab eventKey="products" title="Products">
                <Row className="justify-content-md-start m-1 ">
                  <Col md="auto">
                    <Button variant="primary" size="sm" onClick={handleShow}>
                      Add Product
                    </Button>
                  </Col>
                </Row>
                <Row sm={2} md={3} lg={4} className="g-4 m-2">
                  {/* <ProductCard products={products} /> */}
                  {products.map((product, index) => {
                    return (
                      <Col key={index}>
                        <Card>
                          <Card.Img variant="top" src="holder.js/100px160" />
                          <Card.Body>
                            <Card.Title>{product.title}</Card.Title>
                            <Card.Text>
                              Starting Bid: ${product.biding_price}
                            </Card.Text>
                            <Button
                              variant="outline-primary"
                              size="sm"
                              style={{ float: "left" }}
                              onClick={() => {
                                handleUpdateModal();
                                setTemp(product);
                              }}
                            >
                              Update
                            </Button>
                            <Button
                              variant="outline-danger"
                              size="sm"
                              style={{ float: "right" }}
                              onClick={() => {
                                deleteProduct(product.id);
                              }}
                            >
                              Delete
                            </Button>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Tab>
              <Tab eventKey="bids" title="Bids">
                <Row sm={2} md={3} lg={4} className="g-4 m-2">
                  {/* <ProductCard products={products} /> */}
                  {bids.map((bid, index) => {
                    return (
                      <Col key={index}>
                        <Card>
                          <Card.Img variant="top" src="holder.js/100px160" />
                          <Card.Body>
                            <Card.Title>{bid.product_title}</Card.Title>
                            <Card.Text>
                              Starting Bid: ${bid.starting_bid} <br />
                              Your Bid: ${bid.biding_amount} <br />
                              Total Bids: {bid.bid_count}
                            </Card.Text>
                          </Card.Body>
                        </Card>
                      </Col>
                    );
                  })}
                </Row>
              </Tab>
            </Tabs>
          </Card>
        </Col>
      </Row>
      <AddProductModal addProduct={addProduct} show={show} setShow={setShow} />
      <UpdateProductModal
        updateProduct={updateProduct}
        showUpdateModal={showUpdateModal}
        setShowUpdateModal={setShowUpdateModal}
        temp={temp}
      />
    </>
  );
};

export default ProfilePage;
