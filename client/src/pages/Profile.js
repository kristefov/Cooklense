import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, Container, Col, Row, Image, Button } from 'react-bootstrap';

function Profile() {
  return (
<>
<Container className="p-3 container-fluid d-flex flex-column align-center">

  <Row>
      <h1>Profile</h1>
  </Row>
  <Container>
  <Row>
    
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