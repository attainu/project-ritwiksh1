import React,{useEffect, Fragment} from 'react'
import { useDispatch,useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {Row,Col,ListGroup,Image,Form,Button,Card} from 'react-bootstrap' 

import Message from '../components/Message'
import {addToCart,removeFromCart} from '../actions/cartActions'


const CartScreen = ({match,location,history}) => {

    const productId= match.params.id

    const qty = location.search ? Number(location.search.split('=')[1]): 1

    const dispatch= useDispatch()

    const cart = useSelector( state => state.cart)
    const  {cartItems} = cart

    console.log("cartItems>>>>>",cartItems)


    useEffect(()=>{
        //dipatch if only their is productId,otherwise go to regular cart page
        if(productId){
            dispatch(addToCart(productId,qty))

        }

    },[dispatch,productId,qty])

    const removeFromCartHandler=(id)=>{
        console.log("remove from cart is fired")
        dispatch(removeFromCart(id))
        


    }

    const checkoutHandler =()=>{
            history.push('/login?redirect=shipping')
        console.log('Checkout')
    }


    
    return (
        <Fragment>
            <Row>
            <Col md={8}>
                <h1>Cart:</h1>
                {cartItems.length === 0 ? (<Message>Looks like you don't have anything in your cart yet. Go back and add some items to your cart by clicking,<Link to='/'>here</Link></Message>):
            
            (<ListGroup variant='flush'>
                {cartItems.map(item=>(
                    <ListGroup.Item key={item.product}>
                            <Row>
                                <Col md={2}>
                                <Image src={item.image} alt={item.image} fluid/>
                                </Col>
                                <Col md={3}>
                                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                                </Col>
                  <Col md={2}> &#8377; {item.price}
                  </Col>

                  <Col md={2}>
                  <Form.Control as='select' value={item.qty} onChange={(e)=>dispatch(addToCart(item.product,Number(e.target.value)))}>
                {[...Array(item.countInStock).keys()].map(x=>(<option key={x+1} value={x+1}> {x+1}</option>))}
              </Form.Control>
                       </Col>

                       <Col md={3}>
                        <Button type='button' variant = 'danger' onClick ={()=> removeFromCartHandler(item.product)}>
                        <i className="fa fa-ban"> Delete</i>  </Button>

                       </Col>
                            </Row>


                    </ListGroup.Item>

                ))}
            </ListGroup>)
            }
            </Col>

            </Row>
<Row>
    <br></br>
    <br></br>
    <br></br>
    <br></br>
</Row>
            <Row>
            <Col md={4}>


           <Card>
               <ListGroup variant='flush'>
                   <ListGroup.Item>
                <h2>Total items  ({cartItems.reduce((acc,item)=>acc+item.qty,0)})</h2>

             <h6> &nbsp; Total Price: &#8377;{cartItems.reduce((acc,item)=>acc+item.qty * item.price,0).toFixed(2)} </h6>

               </ListGroup.Item>

               <ListGroup.Item>
            <Button type ='button' className='btn-block' disabled ={cartItems.length===0} onClick={checkoutHandler}>
                Proceed to checkout


            </Button>


               </ListGroup.Item>
               </ListGroup>
           </Card>



            </Col>
            </Row>
         
        </Fragment>
    )
}

export default CartScreen
