//use rfce with the es7 extension to write out a template function with one click
import React from 'react'
import {Container, Row, Col} from 'react-bootstrap';
import MessageSection from '../components/MessageSection';
import Sidebar from '../components/Sidebar';

function ChatPage() {
  return (
    <Container>
    <Row>
      <Col md={4 /* IF WE WANT TO EDIT THE WIDTH AND STYLING OF THE MESSAGES AND CHATS, MD here has to add up to 12. This one takes 4/12 sections, so the other column will be wider and take 8 */}>
        <Sidebar />
      </Col>

      <Col md={8}>
        <MessageSection />  
      </Col>

    </Row>
  </Container>
  )
}

export default ChatPage