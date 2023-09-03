import React, { useState } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import {Col, Container, Row} from 'react-bootstrap';
import './Signup.css'
import { Link, useNavigate } from 'react-router-dom';
import logo from '../assets/logo.png';
import { useSignupUserMutation } from "../services/appApi";





function Signup() {

  const[email, setEmail] = useState('');
  const[name, setName] = useState('');
  const[password, setPassword] = useState('');
  const [signupUser, { isLoading, error }] = useSignupUserMutation();
  const navigate = useNavigate();

  //upload states
  const [image, setImage] = useState(null); //by default, no image
  const [uploadImg, setUploadImg] = useState(false); //This is just a boolean we use to determine whether or not the image is in the process of uploading. We use this boolean to render different stuff depending.
  const [imagePreview, setImagePreview] = useState(null); //This is before you actually set your image, it will just show on the sign up page. This what shows up when you choose a file.

 
  function validateImg(e) { //Make sure it isn't too big 
    const file = e.target.files[0]; //This is how we access the image.
    if(file.size > 1048576) {
     //file < 1 MB always
      return alert("File cannot be over 1 mb") 
    } else {
      setImage(file);
      setImagePreview(URL.createObjectURL(file));
    }
  }

  async function uploadImage() {
    const data = new FormData();
    data.append('file', image);
    data.append('upload_preset', 'xwjbkdcn'); //Our cloudinary upload preset name
    try {
      setUploadImg(true);
      let res = await fetch('https://api.cloudinary.com/v1_1/dwpbaq9zb/image/upload', {
        method: 'post',
        body: data //from the form
      })
      const urlData = await res.json();
      setUploadImg(false);
      return urlData.url
    } catch(error){
      setUploadImg(false);
      console.log(error);
    }
  }

  async function handleSignup(e) {
    e.preventDefault();

    if(!image) return alert("upload picture");
    const url = await uploadImage(image);
    console.log(url); //cloudinary will basically host our profile pictures on db

    //next sign the user up
    signupUser({ name, email, password, picture: url }).then(({ data }) => {
      if (data) {
          console.log(data);
          navigate("/chatpage");
      }
  });

  }

  return ( 
    <Container fluid>

    <Row>
    <Col md={5} className="d-flex align-items-center justify-content-center flex-direction-column ">
    
    <Form style={{width: '90%', maxWidth: 500}} onSubmit={handleSignup}>
      <h2 style={{textAlign: 'center'}}>Sign Up</h2>
      <div className='profile-pic-container'>
        <img src={imagePreview || logo} className='profile-pic' alt='profile pic' />
        <label htmlFor='image-upload' className='image-upload-label'>
          <i className='fas fa-plus-circle add-picture-icon'>add</i>
        </label>
        <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg}/>

      </div>

      <Form.Group className="mb-3" controlId="formBasicName">
        <Form.Label>Name</Form.Label>
        <Form.Control type="text" placeholder="Enter name" onChange={(e) => setName(e.target.value)} value={name}/>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" onChange={(e) => setEmail(e.target.value)} value={email}/>
        <Form.Text className="text-muted ">
          No one else will see it!
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} value={password}/>
      </Form.Group>
      <Button variant="success" type="submit">
        {uploadImg ? 'Creating account :) ' : 'Create Account and Login' /* We are checking if the image is uploading or not here*/} 
      </Button> 
      
      <div className='redirect-signup-button'>
        <Link to='/login'><Button variant='outline-secondary'>Already Have an Account but Accidentally Clicked?</Button></Link>  
      </div>

    </Form>
    </Col>

    <Col  md={7} className="signup-background">
    </Col>
    </Row>
  </Container>
  )
}

export default Signup