import React from "react";

import { Card } from "react-bootstrap";

import {Link} from "react-router-dom"
import Rating from '../components/Rating'



const Product = ({ product }) => {
    return (
      <Card className='my-3 p-2 rounded'>
        <Link to={`/product/${product._id}`}>
          <Card.Img src={product.image} variant='top' />
        </Link>
  
        <Card.Body>
          <Link to={`/product/${product._id}`}>
            <Card.Title as='div'>
              <strong>{product.name}</strong>
            </Card.Title>
          </Link>
  
          <Card.Text as='div'>
            <Rating  value={product.rating} text={`${product.numReviews} reviews`}></Rating>
          </Card.Text>
  {/* as='p' */}
          <Card.Text id='price-style' as='div'> <strong>&#8377; {product.price}</strong></Card.Text>  
        </Card.Body>
      </Card>
    )
  }


export default Product;
