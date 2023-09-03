import React, { useContext, useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Col, Container, Row} from 'react-bootstrap';
import './Login.css'
import { Link, useNavigate } from 'react-router-dom';
import { useLoginUserMutation } from "../services/appApi";
import {AppContext} from "../context/appContext";

//2 columns, one row.

function Login() {

  const[email, setEmail] = useState('');
  const[password, setPassword] = useState('');
  const [loginUser, { isLoading, error }] = useLoginUserMutation();
  const navigate = useNavigate();
  const { socket } = useContext(AppContext); //usecontext hook used here. Check App.js to see context passed.

  function handleLogin(e) {
    e.preventDefault();

    //login handling

    loginUser({ email, password }).then(({ data }) => {
      if (data) {
          // socket work
          socket.emit("new-user"); //new users shown in sidebar.js so update there.
          // navigate to the chat
          navigate("/chatpage");

      } else {
        alert('INCORRECT USERNAME OR PASSWORD');
      }
  });
  }

  return (


  <Container fluid>

    <Row>
    <Col md={5} className=" d-flex align-items-center justify-content-center flex-direction-column ">
    <Form style={{width: '90%', maxWidth: 500}} onSubmit={handleLogin}>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <h2 style={{textAlign: 'center'}}>Log In</h2>
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email} required/>
        <Form.Text className="text-muted ">
          No one else will see it!
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password} required/>
      </Form.Group>
      <Button variant="success" type="submit">
        Submit Information and Login
      </Button>
      
      <div className='redirect-signup-button'>
        <Link to='/signup'><Button variant='outline-secondary'>No Account?</Button></Link>  
      </div>

    </Form>
    </Col>

    <Col  md={7} className="login-background">
    </Col>
    </Row>
  </Container>
  )
  }
export default Login