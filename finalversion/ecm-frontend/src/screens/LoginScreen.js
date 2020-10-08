import React,{useState,useEffect, Fragment} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Row,Col} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {login} from '../actions/userActions'


const LoginScreen = ({location,history}) => {
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')

    const dispatch= useDispatch()
    
    const userLogin = useSelector(state=>state.userLogin)

    const {userInfo,loading,error}= userLogin
    
    //query string
    const redirect =location.search ? location.search.split('=')[1]:'/'


    useEffect(()=>{

        if(userInfo){
            history.push(redirect)
        }
    },[history,userInfo,redirect])

    const submitHandler =(e)=>{

        e.preventDefault()
        //dispatch login
        dispatch(login(email,password))
    }
    
    
    return (
       
<FormContainer>
        <h1> Login</h1>

        {error && <Message>{error}</Message>}
        {loading && <Loader/>}

        <Form  onSubmit={submitHandler}>
            <Form.Group controlId='email'>
            <Form.Label>Email </Form.Label>
            <Form.Control type='email' placeholder='joe@gmail.com' value={email} onChange={(e)=>setEmail(e.target.value)}></Form.Control>
            </Form.Group>

            <Form.Group controlId='password'>
            <Form.Label>Password  </Form.Label>
            <Form.Control type='password' placeholder='Enter your Password...' value={password} onChange={(e)=>setPassword(e.target.value)}></Form.Control>

            </Form.Group>

            <Button type='submit' variant='primary'>Login</Button>


        </Form>

        <Row className='py-3'> 
        <Col>
        Not a member? <Link to={redirect?`/register?redirect=${redirect}`:'/register'}>Sign up here</Link>.
        </Col>
        </Row>



</FormContainer>




      
    )
}

export default LoginScreen
