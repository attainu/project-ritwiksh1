
import React,{useState, Fragment} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {saveShippingAddress} from '../actions/cartActions'

const ShippingScreen = ({history}) => {

    const cart= useSelector(state=>state.cart)

    const {shippingAddress}= cart
    
    const [address,setAddress]=useState(shippingAddress.address)
    const [city,setCity]=useState(shippingAddress.city)
    const [postalCode,setPostalCode]=useState(shippingAddress.postalCode)
    const [country,setCountry]=useState(shippingAddress.country)

    const dispatch= useDispatch()

    const submitHandler= (e)=>{
        e.preventDefault()
        // console.log('submit')

        dispatch(saveShippingAddress({address,city,postalCode,country}))

        history.push('/payment')

    }

    
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 />
            <h1>Enter Your Shipping Details </h1>

            <Form onSubmit={submitHandler}>

        <Form.Group controlId='address'>
            <Form.Label>Address </Form.Label>
            <Form.Control type='text' placeholder='6B,Cannaught Place' value={address} required onChange={(e)=>setAddress(e.target.value)} ></Form.Control>
            </Form.Group>


            <Form.Group controlId='city'>
            <Form.Label>City </Form.Label>
            <Form.Control type='text' placeholder='New Delhi' value={city} required onChange={(e)=>setCity(e.target.value)} ></Form.Control>
            </Form.Group>


            <Form.Group controlId='postalCode'>
            <Form.Label>Postal Code </Form.Label>
            <Form.Control type='text' placeholder='110101' value={postalCode} required onChange={(e)=>setPostalCode(e.target.value)} ></Form.Control>
            </Form.Group>


            <Form.Group controlId='country'>
            <Form.Label>Country </Form.Label>
            <Form.Control type='text' placeholder='India' value={country} required onChange={(e)=>setCountry(e.target.value)} ></Form.Control>
            </Form.Group>
<Button type='submit'> Save address and Continue to payment</Button>
            </Form>


        </FormContainer>
        
        
        )
}

export default ShippingScreen
