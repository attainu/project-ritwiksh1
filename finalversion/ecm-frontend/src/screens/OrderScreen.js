
import React,{useState,useEffect, Fragment} from 'react'
import axios from 'axios'
import {PayPalButton} from 'react-paypal-button-v2'
import {Link} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Col,ListGroup,Image,Card,Row} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getOrderDetails,payOrder} from '../actions/orderActions'
import {ORDER_PAY_RESET} from '../constants/orderConstants'



const OrderScreen = ({match}) => {
const orderId= match.params.id

//paypal sdk state
const [sdkReady,setSdkReady]=useState(false);

    const dispatch= useDispatch()

   

   

const orderDetails =useSelector (state=>state.orderDetails)
const {order,loading,error} = orderDetails



const orderPay =useSelector (state=>state.orderPay)
const {loading:loadingPay,success:successPay} = orderPay

if(!loading){
    //item Total
   
    order.itemsPrice = order.orderItems.reduce((acc,item)=>acc+item.price *item.qty,0)
}
// useEffect(()=>{
// dispatch(getOrderDetails(orderId))
// },[dispatch,orderId])
// //dispatch,orderId
    
useEffect(() => {
    
    
    //dynamic payPal Script
    const addPaypalScript=async()=>{

        const {data:clientId} = await axios.get('/api/config/paypal')
        const script = document.createElement('script')
        script.type= 'text/javascript'
        script.src=`https://www.paypal.com/sdk/js?client-id=${clientId}`
        script.async =true
        script.onload=()=>{
            setSdkReady(true)
        }
document.body.appendChild(script)
        //paypal client id received
        // console.log("clientId>>>>>>",clientId)
    }
    // addPaypalScript()

    


if(!order || successPay){
    if(!order || order._id !== orderId) {
        dispatch({type:ORDER_PAY_RESET})
        dispatch(getOrderDetails(orderId))
    }}else if(!order.isPaid){
        if(!window.paypal){
            // console.log("PaypalScript runs!")
            addPaypalScript()
        }else{
            setSdkReady(true)
        }
    }

}, [order,orderId,dispatch,successPay]) 


// [order,orderId,dispatch]

 
    
const successPaymentHandler=(paymentResult)=>{
console.log(paymentResult)
dispatch(payOrder(orderId,paymentResult))



}
    
    return loading?<Loader/> :error ? <Message variant='danger'>{error}</Message>:
    <>
<h1>Order Details:(Order-Id) <u>{order._id} </u></h1>    


<Row>
<Col md={8}>
<ListGroup variant='flush'>
<h2>Shipping Details</h2>

<ListGroup.Item>
    
<p>Name: <strong>   {order.user.name}</strong></p>
<p>Email:<strong> {order.user.email}</strong></p>
    
        <h6><u>Delivery Address:</u></h6>

        <strong> {order.shippingAddress.address} <br/> {order.shippingAddress.city} <br/> Pin Code - {order.shippingAddress.postalCode} <br/> {order.shippingAddress.country} </strong>
        <br/>
        <br/>
    {order.isDelivered ? <Message variant='success'>Delivered on {order.DeliveredAt}</Message>:<Message variant='warning'>Not Delivered</Message>}

    
</ListGroup.Item>
<br/>
<h2>Payment Method:</h2>
<ListGroup.Item>
    
    <label> Paid with: </label>
    <strong> {order.paymentMethod}</strong>
    <br/>
    {order.isPaid ? <Message variant='success'>Paid on {order.paidAt}</Message>:<Message variant='warning'>Not Paid</Message>}


</ListGroup.Item>
<br/>
<h2> Order Details :</h2>

<ListGroup.Item>
{order.orderItems.length===0 ? (<Message>No Orders</Message>):(
    <ListGroup variant='flush'>
        {order.orderItems.map((item,index)=>(
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
        <Col> &#8377;{order.itemsPrice}</Col>
    </Row>
</ListGroup.Item>
<ListGroup.Item>
    <Row>
        <Col>
        Shipping
        </Col>
        <Col> &#8377;{order.shippingPrice}</Col>
    </Row>
</ListGroup.Item>
<ListGroup.Item>
    <Row>
        <Col>
        Tax(18% GST)
        </Col>
        <Col> &#8377;{order.taxPrice}</Col>
    </Row>
   
</ListGroup.Item>
<ListGroup.Item>
    <Row>
        <Col>
       Total
        </Col>
        <Col> &#8377;{order.totalPrice}</Col>
    </Row>
</ListGroup.Item>

        {!order.isPaid && (
            <ListGroup.Item>
                {loadingPay && <Loader/>}
                {!sdkReady ? (<Loader/>):(<PayPalButton amount={order.totalPrice} onSuccess={successPaymentHandler}/>)}

            </ListGroup.Item>
        )}
</ListGroup>

    </Card>
</Col>

        </Row>

    
    </>
}

export default OrderScreen
