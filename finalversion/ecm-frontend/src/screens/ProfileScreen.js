import React,{useState,useEffect, Fragment} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {useDispatch,useSelector} from 'react-redux'
import {Form,Button,Row,Col,Table} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {getUserDetails,updateUserProfile} from '../actions/userActions'
import {listMyOrders} from '../actions/orderActions'
import { LinkContainer } from 'react-router-bootstrap'


const ProfileScreen = ({location,history}) => {
    const [name,setName]= useState('')
    const [email,setEmail]=useState('')
    const [password,setPassword]=useState('')
    const [confirmPassword,setConfirmPassword]=useState('')

    const [message,setMessage]=useState(null)

    const dispatch= useDispatch()
    
    const userDetails = useSelector((state)=>state.userDetails)

    const {user,loading,error}= userDetails
    
// console.log("UserDetails",userDetails)
 

    const userLogin = useSelector(state=>state.userLogin)

    const {userInfo}= userLogin



    const userUpdateProfile = useSelector(state=>state.userUpdateProfile)
    const {success}= userUpdateProfile
    // console.log("success>>>",userUpdateProfile)

    // const orderListMy = useSelector((state)=>state.orderListMy)
    // const {loading:loadingOrders,error:errorOrders,orders}= orderListMy
    const orderListMy = useSelector((state) => state.orderListMy)
  const { loading: loadingOrders, error: errorOrders, orders } = orderListMy


    useEffect(()=>{

        if(!userInfo){
            history.push('/login')
        }
        else{
            //'profile' to change the id in the params to make the path '/users/profile' for userprofile
               if(!user.name) {
                   dispatch(getUserDetails('profile'))
                   dispatch(listMyOrders())
            }   else{
                setName(user.name)
                setEmail(user.email)
            }
        }
    },[history,userInfo,dispatch,user])

    const submitHandler =(e)=>{

        e.preventDefault()
        if(password!== confirmPassword){
            setMessage("Password and confirm password do not macth")
        }
        else {

            //dispatch update profile
            dispatch(updateUserProfile({id:user._id,name,email,password}))
        }
        
    }
    
    return (


<Row>

    <Col md={3}>

    <h2>Profile <br/><small>Update your profile info</small></h2>
    
        {message && <Message>{message}</Message>}
    {error && <Message>{error}</Message>}
    {success && <Message variant='info'>Profile Updated Successfully</Message>}
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

            <Button type='submit' variant='primary'>Update Profile</Button>


        </Form>
    
         </Col>
    
    
    
    
    
    
    <Col md={9}>
        <h2>My Orders</h2>
       
        {loadingOrders ? <Loader/> :errorOrders?<Message>{errorOrders}</Message>:(
            <Table striped bordered hover responsive className='table-sm'>
                <thead>
                    <tr>
                        <th>ID </th>
                        <th>DATE</th>
                        <th>TOTAL PRICE </th>
                        <th>PAID </th>
                        <th>DELIVERED </th>
                        <th> ORDER LINK</th>
                    </tr>
                </thead>
                <tbody>
                


                {orders.map((order) => (
                <tr key={order._id}>
                  <td>{order._id}</td>
                  <td>{order.createdAt.substring(0, 10)}</td>
                  <td>&#8377; {order.totalPrice}</td>
                  <td>
                    {order.isPaid ? (
                       <p>Yes</p>
                    ) : (
                        <p>No</p>
                    )}
                  </td>
                  <td>
                    {order.isDelivered ? (
                      <p>Yes</p>
                    ) : (
                        <p>No</p>
                    )}
                  </td>
                  <td>
                    <LinkContainer to={`/order/${order._id}`}>
                      <Button  variant='dark'>
                        Details
                      </Button>
                    </LinkContainer>
                  </td>
                </tr>
              ))}


                </tbody>
            </Table>
        )}

    </Col>
</Row>


      
    )
}

export default ProfileScreen









// {orders.map((order)=>(
//                         <tr key={order._id}>
//                         <td>{order._id}</td>
//                         {/* <td>{order.createdAt.substring(0,10)}</td> */}
//                         <td>{order.totalPrice}</td>
//                         <td>{order.isPaid ? order.paidAt.substring(0,10):<strong>Not paid</strong>}</td>
//                         <td>{order.isDelivered ? order.deliveredAt.substring(0,10):<strong>Not Deliverd</strong>}</td>
//                         <td><LinkContainer to={`/order/${order._id}`}></LinkContainer><Button variant='primary'>Details</Button></td>
//                     </tr>

//                     ))
//                     }