import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, Container, Col, Row, Image, Button,Card, InputGroup, Form, ButtonGroup,FloatingLabel  } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';




function Profile(){
  return (
<>
<Container className="p-3 container-fluid d-flex flex-column align-center">

  <Row>
      <h1>Profile</h1>
  </Row>
  <Container>
  <Row>

    <Col xs={2} md={2}>
          <Image xs={2} src="https://picsum.photos/300/300/?blur=2" fluid  roundedCircle />
          <Col className='d-flex justify-content-center'>
      <Button variant="secondary">Change</Button>
      <Button variant="secondary">Save</Button>
      </Col>
        </Col>
      <Col xs={3} md={2}>
      <Form.Group controlId="formFileLg" className="mb-3">
        <Form.Label>Large file input example</Form.Label>
        <Form.Control type="file" size="lg" />
      </Form.Group>
      </Col>
    </Row>
  <Row>
     <Col>
  <Tab.Container id="list-group-tabs-example" defaultActiveKey="#link1">
      <Row>
        <Col sm={4}>
          <ListGroup>
            <ListGroup.Item action href="#link1">
              Link 1
            </ListGroup.Item>
            <ListGroup.Item action href="#link2">
              Link 2
            </ListGroup.Item>
          </ListGroup>
        </Col>
        <Col sm={8}>
          <Tab.Content>
            <Tab.Pane eventKey="#link1">Tab pane content 1</Tab.Pane>
            <Tab.Pane eventKey="#link2">Tab pane content 2</Tab.Pane>
          </Tab.Content>
        </Col>
      </Row>
    </Tab.Container>
    </Col>
    <Container>
      <h2>
        Update User Information
      </h2>
      <Row>
      <Form.Group className="mb-3">
          <Form.Label htmlFor="firstName">First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your First Name"
            name="firstName"
            // onChange={handleInputChange}
            // value={userFormData.firstName}
            required
          />
        
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Last Name"
            name="lastName"
            // onChange={handleInputChange}
            // value={userFormData.lastName}
            required
          />
         




        </Form.Group>



        <Form.Group className='mb-3'>
          
          <FloatingLabel
          htmlFor="username"
          label="Your Username"
          className="mb-3"
        >
          <Form.Control
            type="text"
            placeholder="Your username"
            name="username"
            // onChange={handleInputChange}
            // value={userFormData.username}
            required
             />
        </FloatingLabel>
       
          </Form.Group>

        <Form.Group className='mb-3'>
          
          <FloatingLabel
          htmlFor="email"
          label="Email address"
          className="mb-3"
        >
          <Form.Control name="email" type="email" placeholder="name@example.com"
          //  onChange={handleInputChange}
          //     value={userFormData.email}
              required />
        </FloatingLabel>
            <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
          </Form.Group>
  
          <Form.Group className='mb-3'>
          <Form.Floating>
          <Form.Control
            name="password"
            type="password"
            placeholder="Password"
            // onChange={handleInputChange}
            // value={userFormData.password}
            required
          />
        </Form.Floating>
            <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
          </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="avatar">Avatar</Form.Label>
          <Form.Control
            type="text"
            placeholder="Avatar"
            name="avatar"
            // onChange={handleInputChange}
            // value={userFormData.avatar}
            required
          />
        </Form.Group>

      </Row>
    </Container>

    </Row>
    <Row>
      <Col xs={4} md={2}>
          <Card>        <Image class="card-img-top" src="holder.js/100x180/?text=Image cap" alt="Card image cap"></Image>
            <div class="card-body">
              <h4 class="card-title">Title</h4>
              <p class="card-text">Text</p>
            </div>
            <ul class="list-group list-group-flush">
              <li class="list-group-item">Item 1</li>
              <li class="list-group-item">Item 2</li>
              <li class="list-group-item">Item 3</li>
            </ul>
      </Card>
      </Col>
      </Row>
      </Container>
    </Container>
    </>
  );
}

export default Profile;