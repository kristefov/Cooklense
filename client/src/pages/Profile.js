import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, Container, Col, Row, Image, Button,Card, InputGroup, Form, ButtonGroup,FloatingLabel,ListGroup  } from 'react-bootstrap';




function Profile(){
  return (
<>
<Container className="p-3 container-fluid d-flex flex-column align-center">

  <Row>
      <h1>Profile</h1>
  </Row>
  <Container>
  <Row>

          <Col xs={8} md={10} lg={10}>
            <Col>
                <Row>
                <Container className="section">
              <Container className="container py-5 h-100">
                <Row className="row d-flex justify-content-center align-items-center h-100">
                  <Col className="col col-md-4 col-lg-4 col-xl-4">
                    <Card className="card">
                      <Card.Body className="card-body p-0">
                        <Row className="d-flex flex-column text-black">
                      <Col>
                      <Row className='mb-3'>
                          <Card.Img xs={2} src="https://picsum.photos/300/300/?blur=2" fluid alt="Generic placeholder image" className="img-fluid" roundedCircle />
                          </Row>
                          <Col className="flex-grow-1 ms-3">
                            <h5 className="mb-1">Danny McLoan</h5>
                            <p className="mb-2 pb-1" >Senior Journalist</p>
                            <Col className="d-flex justify-content-start rounded-3 p-2 mb-2">
                              <Col>
                                <p className="small text-muted mb-1">Collections</p>
                                <p className="mb-0">41</p>
                              </Col>
                              <Col className="px-3">
                                <p className="small text-muted mb-1">Favorites</p>
                                <p className="mb-0">976</p>
                              </Col>
                              <Col>
                                <p className="small text-muted mb-1">Activity %</p>
                                <p className="mb-0">8.5</p>
                              </Col>

                            </Col>

                          </Col>
                          </Col>
                        </Row>
                      </Card.Body>
                      </Card>
                    </Col>
                    <Col className="col col-md-8 col-lg-8 col-xl-8">
                    <Card>
                        <Card.Header>       Update User Information</Card.Header>
                        <Card.Body>
 <Container typeof='' className='container-fluid'>
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
                        </Card.Body>
                    </Card>
                    </Col>
                  </Row>
              </Container>
            </Container>
            </Row>
        </Col>

        </Col>
    </Row>
    <Row xs={1} md={2} xl={3} className="g-4">
      {Array.from({ length: 9 }).map((_, idx) => (
        <Col key={idx}>
          <Card>
            <Card.Img variant="top" src="https://picsum.photos/300/100/?blur=2" />
            <Card.Body>
              <Card.Title>Card title</Card.Title>
              <Card.Text>
                This is a longer card with supporting text below as a natural
                lead-in to additional content. This content is a little bit
                longer.
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
      </Container>
    </Container>
    </>
  );
}

export default Profile;