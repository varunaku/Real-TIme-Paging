import React from 'react'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Button from 'react-bootstrap/Button';
import {LinkContainer} from 'react-router-bootstrap';
import logo from '../assets/logo.png';
import { useLogoutUserMutation } from "../services/appApi";
import { useSelector } from "react-redux";
//Bootstrap Navbar used: refer to documentation: https://react-bootstrap.netlify.app/components/navbar/
// npm i react-router-bootstrap needed too

//link container removes the need for href, and we instead use to='...'
//We will hide the login page once you login here. This is the nav bar basically


function Navigation() {
  const user = useSelector((state) => state.user);
  const [logoutUser] = useLogoutUserMutation();
    async function handleLogout(e) {
        e.preventDefault();
        await logoutUser(user);
        // redirect to home page
        window.location.replace("/");
    }
    
  return (
    
    <Navbar bg="light" expand="lg">
        
      <Container>
        <LinkContainer to="/">
            <Navbar.Brand>
                <img src={logo} style={{ width: 40, height: 40 }} />
            </Navbar.Brand>
        </LinkContainer>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            
            {!user && (//if user doesn't exist show login
              <LinkContainer to='/login'>
                <Nav.Link>Login</Nav.Link>
              </LinkContainer>
            )}

            <LinkContainer to='/chatpage'>
            <Nav.Link>Chat</Nav.Link>
            </LinkContainer>

            {user && (
              <NavDropdown
                  title={
                      <>
                          <img src={user.picture} style={{ width: 30, height: 30, marginRight: 10, objectFit: "cover", borderRadius: "50%" }} />
                          {user.name}
                      </>
                  }
                  id="basic-nav-dropdown"
              >
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>

                  <NavDropdown.Item>
                      <Button variant="danger" onClick={handleLogout}>
                          Logout
                      </Button>
                  </NavDropdown.Item>
              </NavDropdown>
          )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>

  );
}

export default Navigation