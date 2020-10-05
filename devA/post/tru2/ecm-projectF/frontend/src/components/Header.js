import React from "react";
import { LinkContainer } from "react-router-bootstrap";
import { Container, Nav, Navbar, NavDropdown } from "react-bootstrap";

import {useDispatch,useSelector} from 'react-redux'
import { logout } from "../actions/userActions";

const Header = () => {
  
  const dispatch= useDispatch()
  const userLogin =useSelector(state=>state.userLogin)

  const {userInfo}=userLogin
  
  const logoutHandler =()=>{
    // console.log("logout")
    dispatch(logout())
  }
  return (
    <header>
      <Navbar bg="light" variant="light" expand="lg" collapseOnSelect>
        <Container>
            <LinkContainer to='/'>
          <Navbar.Brand>eShoppe</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <LinkContainer to='/cart'>
              <Nav.Link>
                <i className="fas fa-shopping-cart"></i>Cart
              </Nav.Link>
              </LinkContainer>

              {userInfo ? (<NavDropdown title={userInfo.name} id='username'>
                <LinkContainer to='/profile'>
                  <NavDropdown.Item>Profile</NavDropdown.Item>
                </LinkContainer>
               <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
                
                
                 </NavDropdown>):
              (<LinkContainer to='/login'>
              <Nav.Link>
                <i className="fas fa-user"></i>Signin
              </Nav.Link>
              </LinkContainer>)}
              
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;