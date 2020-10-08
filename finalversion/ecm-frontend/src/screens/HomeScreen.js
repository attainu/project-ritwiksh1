import React, { Fragment, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { Row, Col } from "react-bootstrap";

import Product from "../components/Product.js";
import { listProducts } from "../actions/productActions";
import Loader from "../components/Loader";
import Message from '../components/Message'

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productList = useSelector((state) => state.productList);
  const { loading, error, products } = productList;

  useEffect(() => {
    dispatch(listProducts());
  }, [dispatch]);

  // const products=[]
  return (
    <Fragment>
      <h1>Latest Products</h1>
      {loading ? (
        // <h2>Loading...</h2>
        <Loader/>
      ) : error ? (
        // <h3>{error}</h3>
      <Message variant={'danger'}>{error}</Message>
      ) : (
        <Row>
          {products.map((product) => (
            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
              <Product product={product} />
            </Col>
          ))}
        </Row>
      )}
    </Fragment>
  );
};
export default HomeScreen;
