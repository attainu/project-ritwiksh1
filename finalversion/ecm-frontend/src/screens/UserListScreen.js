import React,{useState,useEffect, Fragment} from 'react'
import {Link, Redirect} from 'react-router-dom'
import {LinkContainer} from 'react-router-bootstrap'
import {useDispatch,useSelector} from 'react-redux'
import {Button,Table} from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {listUsers,deleteUser} from '../actions/userActions'


const UserListScreen = ({history}) => {
    const dispatch= useDispatch()

    const userList =useSelector(state=> state.userList)
    const {loading,error,users} = userList

    const userLogin =useSelector(state=> state.userLogin)
    const {userInfo} = userLogin

    const userDelete =useSelector(state=> state.userDelete)
    const {success:successDelete} = userDelete

    useEffect(()=>{
        if(userInfo && userInfo.isAdmin){
            dispatch(listUsers())
        } else{
            history.push('/login')
        }
        

    },[dispatch,history,successDelete,userInfo])
    
    const deleteHandler = (id)=>{
        console.log("Delete user button fired")
        if(window.confirm('Confirmation: Do you want to delete user?')){
            dispatch(deleteUser(id))
        }
    }
    return (
        <Fragment>
            <h2>Users List</h2>
        {loading ? <Loader/> :error ? <Message>{error}</Message>:(


<Table striped bordered hover responsive className='table-sm'>
<thead>
    <tr>
<th>ID</th>
<th>NAME</th>
<th>EMAIL</th>
<th>ADMIN</th>
<th>REMOVE</th>
</tr>
</thead>

<tbody>

{users.map(user=>(

<tr key={user._id}>
    <td>{user._id}</td>
    <td>{user.name}</td>
    <td>{user.email}</td>
<td>{user.isAdmin ? (<p>Yes</p>):(<p>No</p>)}</td>
    <td style={{padding:"0.9%"}}>
{/* <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='warning' className='btn-sm'>
                     Edit
                    </Button>
                  </LinkContainer> &nbsp; */}
<Button variant='danger' className='btn-sm' onClick={()=>deleteHandler(user._id)}>Delete</Button>

    </td>
</tr>
))}

</tbody>

</Table>


        )}
        </Fragment>
        
    )
}

export default UserListScreen
