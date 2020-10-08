
import React,{useState,useEffect, Fragment} from 'react'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Col,ListGroup,Image,Card,Row} from 'react-bootstrap'
import Message from '../components/Message'
import CheckoutSteps from '../components/CheckoutSteps'
import {createOrder} from '../actions/orderActions'



const PlaceOrderScreen = ({history}) => {
    const dispatch= useDispatch()
    const cart =useSelector(state=>state.cart)


    console.log("shipping address",cart.shippingAddress)
    //item Total
    cart.itemsPrice = cart.cartItems.reduce((acc,item)=>acc+item.price *item.qty,0)


//shipping total
cart.shippingPrice=cart.itemsPrice >1000 ? 0 :50

//Tax total
cart.taxPrice =Number((0.18 * cart.itemsPrice).toFixed(2))

//Grand Total
cart.totalPrice =(Number(cart.itemsPrice) +Number(cart.shippingPrice)+Number(cart.taxPrice)).toFixed(2)

const orderCreate =useSelector (state=>state.orderCreate)
const {order,success,error} = orderCreate


useEffect(()=>{
if(success){
    history.push(`/order/${order._id}`)
}
// eslint-disable-next-line
},[history,success])

    const placeOrderHandler= ()=>{
dispatch(createOrder({orderItems:cart.cartItems,

shippingAddress:cart.shippingAddress,
paymentMethod:cart.paymentMethod,
itemsPrice:cart.itemsPrice,
shippingPrice:cart.shippingPrice,
taxPrice:cart.taxPrice,
totalPrice:cart.totalPrice

}))

// console.log("order placed successfully")

 
    }

    
    return (
    <Fragment>
        <CheckoutSteps step1 step2 step3 step4/>

        <Row>
<Col md={8}>
<ListGroup variant='flush'>
<h2>Shipping Details</h2>
<ListGroup.Item>
    

    
        <h6>Delivery Address:</h6>

        <strong> {cart.shippingAddress.address} <br/> {cart.shippingAddress.city} <br/> Pin Code - {cart.shippingAddress.postalCode} <br/> {cart.shippingAddress.country} </strong>
    
</ListGroup.Item>
<br/>
<h2>Payment Method:</h2>
<ListGroup.Item>
    
    <label> Paid with: </label>
    <strong> {cart.paymentMethod}</strong>


</ListGroup.Item>
<br/>
<h2> Order Details :</h2>

<ListGroup.Item>
{cart.cartItems.length===0 ? (<Message>Your cart is Empty. Go back add some items</Message>):(
    <ListGroup variant='flush'>
        {cart.cartItems.map((item,index)=>(
            <ListGroup.Item key={index}>
                <Row>
            <Col md={1}>
                <Image src={item.image} alt={item.name} fluid />
            </Col>
            <Col>
            <Link to={`/product/${item.product}`}>{item.name}</Link>
            </Col>
            <Col>
            {item.qty} X  &#8377;{item.price} = &#8377;{item.qty *item.price}
            </Col>

                </Row>
            </ListGroup.Item>
        ))}
    </ListGroup>
)}

</ListGroup.Item>

</ListGroup>

</Col>

<Col md={4}>
    <Card>
<ListGroup variant='flush'>
<ListGroup.Item>
<h2> Order Summary:</h2>
</ListGroup.Item>
<ListGroup.Item>
    <Row>
        <Col>
        Items Total
        </Col>
        <Col> &#8377;{cart.itemsPrice}</Col>
    </Row>
</ListGroup.Item>
<ListGroup.Item>
    <Row>
        <Col>
        Shipping
        </Col>
        <Col> &#8377;{cart.shippingPrice}</Col>
    </Row>
</ListGroup.Item>
<ListGroup.Item>
    <Row>
        <Col>
        Tax(18% GST)
        </Col>
        <Col> &#8377;{cart.taxPrice}</Col>
    </Row>
   
</ListGroup.Item>
<ListGroup.Item>
    <Row>
        <Col>
       Total
        </Col>
        <Col> &#8377;{cart.totalPrice}</Col>
    </Row>
</ListGroup.Item>

        <ListGroup.Item>{error && <Message variant='danger'>{error}</Message>}</ListGroup.Item>
<ListGroup.Item>
            <Button type='button' className='btn-block' disabled={cart.cartItems===0} onClick={placeOrderHandler}>Click here to Place Order</Button>

</ListGroup.Item>
</ListGroup>

    </Card>
</Col>

        </Row>



    </Fragment>
    
        )
}

export default PlaceOrderScreen
