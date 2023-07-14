import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, Container, Col, Row, Image, Button } from 'react-bootstrap';
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


    </Row>
    <Row>
      <div class="card">
        <Image class="card-img-top" src="holder.js/100x180/?text=Image cap" alt="Card image cap"></Image>
        <div class="card-body">
          <h4 class="card-title">Title</h4>
          <p class="card-text">Text</p>
        </div>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Item 1</li>
          <li class="list-group-item">Item 2</li>
          <li class="list-group-item">Item 3</li>
        </ul>
      </div>
      </Row>
      </Container>
    </Container>
    </>
  );
}

export default Profile;