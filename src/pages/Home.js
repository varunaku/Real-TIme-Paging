import React from 'react';
import {Row, Col, Button} from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import './Home.css';

//col md=6 just means here that the screen ius split into 2 columns, one half of which has the first text part, and the other half of which has the background picture.

function Home() {
  return (
    <Row>
        <Col md={6 /*6 and above for medium screens */} className='d-flex flex-direction-column align-items-center justify-content-center' >
            <div>
                <h1> 
                    Get in touch with your coworkers!
                </h1>
                <p> ONLY our employees have access to this website. It is in a way, a paging application </p>
                <LinkContainer to='/chatpage'>
                    <Button className='homepage-button' variant='info'>
                        CLICK HERE
                    </Button>
                </LinkContainer>
            </div>
        </Col>
        <Col md={6} className='home-background'>
        </Col>
    </Row>
  )
}

export default Home