
import React,{useState} from 'react'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Col} from 'react-bootstrap'
import FormContainer from '../components/FormContainer'
import CheckoutSteps from '../components/CheckoutSteps'
import {savePaymentMethod} from '../actions/cartActions'

const PaymentScreen = ({history}) => {

    const cart= useSelector(state=>state.cart)

    const {shippingAddress}= cart

    //check for shipping address,if not available redirect to shipping 
    if(!shippingAddress){
        history.push('/shipping')
    }
    
    const [paymentMethod,setPaymentMethod] =useState('Paypal')



    const dispatch= useDispatch()

    const submitHandler= (e)=>{
        e.preventDefault()
        // console.log('submit')

        dispatch(savePaymentMethod(paymentMethod))

        history.push('/placeorder')

    }

    
    return (
        <FormContainer>
            <CheckoutSteps step1 step2 step3/>
            <h1> Payment </h1>

            <Form onSubmit={submitHandler}>

        
<Form.Group>

    <Form.Label >Select Payment:</Form.Label>

<Col>
<Form.Check type='radio' label='PayPal/Card' id='PayPal' name='paymentMethod' value='PayPal' checked onChange={(e)=>setPaymentMethod(e.target.value)}/> 
</Col>


<Col>
<Form.Check type='radio' label='RazorPay' id='RazorPay' name='paymentMethod' value='RazorPay' onChange={(e)=>setPaymentMethod(e.target.value)}/>
</Col>

</Form.Group>


<Button type='submit'> Save Payment and Proceed to place Order</Button>
            </Form>


        </FormContainer>
        
        
        )
}

export default PaymentScreen
