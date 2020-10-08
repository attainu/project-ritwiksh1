import React,{useState,useEffect, Fragment} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Row,Col} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {register} from '../actions/userActions'


const RegisterScreen = ({location,history}) => {
    const [name,setName]= useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')

    const [message,setMessage]=useState(null)

    const dispatch= useDispatch()
    
    const userRegister = useSelector(state=>state.userRegister)

    const {userInfo,loading,error}= userRegister
    
    //query string
    const redirect =location.search ? location.search.split('=')[1]:'/'


    useEffect(()=>{

        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler =(e)=>{

        e.preventDefault()
        if(password!== confirmPassword){
            setMessage("Password and confirm password do not macth")
        }
        else {

            dispatch(register(name,email,password))
        }
        //dispatch register
    }
    
    
    return (
       
<FormContainer>
        <h1>Register User</h1>
        {message && <Message>{message}</Message>}
    {error && <Message>{error}</Message>}
        {loading && <Loader/>}

        <Form  onSubmit={submitHandler}>
        <Form.Group controlId='name'>
            <Form.Label>Name </Form.Label>
            <Form.Control type='name' placeholder='Robin' value={name} onChange={(e)=>setName(e.target.value)}></Form.Control>
            </Form.Group>


            <Form.Group controlId='email'>
            <Form.Label>Email </Form.Label>
            <Form.Control type='email' placeholder='joe@gmail.com' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
            <Form.Label>Password  </Form.Label>
            <Form.Control type='password' placeholder='Enter your Password...' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>

            </Form.Group>

            <Form.Group controlId='confirmPassword'>
            <Form.Label>Confirm Password  </Form.Label>
            <Form.Control type='password' placeholder='Enter Password Again...' value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}></Form.Control>

            </Form.Group>

            <Button type='submit' variant='primary'>SignUp</Button>


        </Form>

        <Row className='py-3'> 
        <Col>
        Already a member? Go <Link to={redirect?`/login?redirect=${redirect}`:'/login'}>Signin here</Link>.
        </Col>
        </Row>



</FormContainer>




      
    )
}

export default RegisterScreen
