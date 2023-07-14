import React from 'react';
import { Link } from 'react-router-dom';
import { Tab, Container, Col, Row, Image, Button,Card, InputGroup, Form, ButtonGroup, ListGroupItem   } from 'react-bootstrap';
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

          <Col xs={8} md={10} lg={10}>
            <Col>
                <Row>
                <Container className="section vh-100">
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
                          <Row className="flex-grow-1 ms-3">
                            <h5 className="mb-1">Danny McLoan</h5>
                            <p className="mb-2 pb-1" >Senior Journalist</p>
                            <Row className="d-flex justify-content-start rounded-3 p-2 mb-2">
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

                            </Row>

                          </Row>
                          </Col>
                        </Row>
                      </Card.Body>
                      </Card>
                    </Col>
                    <Col className="col col-md-8 col-lg-8 col-xl-8">
                    <Card>
                        <Card.Header>Quote</Card.Header>
                        <Card.Body>
                          <blockquote className="blockquote mb-0">
                            <p>
                              {' '}
                              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer
                              posuere erat a ante.{' '}
                            </p>
                            <footer className="blockquote-footer">
                              Someone famous in <cite title="Source Title">Source Title</cite>
                            </footer>
                          </blockquote>
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