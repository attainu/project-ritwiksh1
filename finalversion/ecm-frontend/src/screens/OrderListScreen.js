import React,{useState,useEffect, Fragment} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {Button,Table} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listOrders} from '../actions/orderActions'


const OrderListScreen = ({history}) => {
    const dispatch= useDispatch()
  
    const orderList =useSelector(state=> state.orderList)
    const {loading,error,orders} = orderList

    const userLogin =useSelector(state=> state.userLogin)
    const {userInfo} = userLogin



    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listOrders())
        } else{
            history.push('/login')
        }
        

    },[dispatch,history,userInfo])
   
    return (
        <Fragment>
            <h2>Orders List</h2>
        {loading ? <Loader/> :error ? <Message>{error}</Message>:(


<Table striped bordered hover responsive className='table-sm'>
<thead>
    <tr>
<th>ORDER ID</th>
<th>USER</th>
<th>DATE</th>
<th>TOTAL PRICE</th>
<th>PAID</th>
<th>DELIVERED</th>
<th>ORDER INFO</th>

</tr>
</thead>

<tbody>

{orders.map(order=>(

<tr key={order._id}>
    <td>{order._id}</td>
    <td>{order.user && order.user.name}</td>
    <td>{order.createdAt.substring(0,10)}</td>
    <td> &#8377; {order.totalPrice}</td>
<td>{order.isPaid ? (<p>Yes</p>):(<p>No</p>)}</td>
<td>{order.isDelivered ? (<p>Yes</p>):(<p>No</p>)}</td>
  
    <td style={{padding:"0.9%"}}>
<LinkContainer to={`/order/${order._id}`}>
                    <Button variant='warning' className='btn-sm'>
                     Details
                    </Button>
                  </LinkContainer>


    </td>
</tr>
))}

</tbody>

</Table>


        )}
        </Fragment>
        
    )
}

export default OrderListScreen
