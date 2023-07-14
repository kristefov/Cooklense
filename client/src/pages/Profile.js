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
                      <Card.Body className="card-body p-1">
                        <Container className="d-flex flex-column text-black">
                          <Container className="flex-shrink-1">
                          <Card.Img xs={2} src="https://picsum.photos/300/300/?blur=2" fluid alt="Generic placeholder image" className="img-fluid" roundedCircle />
                        
                          </Container>
                          <Container className="flex-grow-1 ms-3">
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

                          </Container>
                        </Container>
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
                
                  <Col className='d-flex justify-content-center'>
              <Button variant="secondary">Change</Button>
              <Button variant="secondary">Save</Button>
              </Col>
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

    </Row>

      </Container>
    </Container>
    </>
  );
}

export default Profile;