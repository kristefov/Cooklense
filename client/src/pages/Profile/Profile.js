import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect } from "react";
import {
  Button,
  ButtonGroup,
  Card,
  Col,
  Container,
  FloatingLabel,
  Form,
  Image,
  InputGroup,
  ListGroup,
  Row,
  Tab,
} from "react-bootstrap";
import { Link } from "react-router-dom";
import { UPDATE_USER } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";
import RecipeCard from "../../components/RecipeCard";

function Profile() {
  const { data } = useQuery(GET_ME);
  const [updateUser] = useMutation(UPDATE_USER);
  const userData = data?.me ?? {};
  console.log(userData);

  const [userDataState, setUserDataState] = useState();

  useEffect(() => {
    if (userData) {
      setUserDataState(userData);
    }
  }, [userData]);
  if (!userDataState) {
    return <div>Loading...</div>;
  }
  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = Object.fromEntries(new FormData(event.target).entries());
    console.log(formData);
    try {
      await updateUser({ variables: formData });
    } catch (error) {
      console.log(error);
    }
  };

  // let countArray = userDataState.savedRecipes;
  // console.log(countArray);
  // let count = 0;
  // for (let i = 0; i < countArray.length; i++) {
  //   // if entity is object, increase objectsLen by 1, which is the stores the total number of objects in array.
  //   if (countArray[i] instanceof Object) {
  //     count++;
  //   }
  // }
  // console.log(count);

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
                                  <Row className="mb-3">
                                    <Card.Img
                                      xs={2}
                                      src="https://picsum.photos/300/300/?blur=2"
                                      fluid
                                      alt="Generic placeholder image"
                                      className="img-fluid"
                                      roundedCircle
                                    />
                                  </Row>
                                  <Col className="flex-grow-1 ms-3">
                                    <h5 className="mb-1">
                                      {userDataState.firstName}
                                    </h5>
                                    <h5 className="mb-2 pb-1">
                                      {userDataState.lastName}
                                    </h5>
                                    <Col className="d-flex justify-content-start rounded-3 p-2 mb-2">
                                      <Col>
                                        <p className="small text-muted mb-1">
                                          Collections
                                        </p>
                                        <p className="mb-0"></p>
                                      </Col>
                                      <Col className="px-3">
                                        <p className="small text-muted mb-1">
                                          Favorites
                                        </p>
                                        <p className="mb-0">976</p>
                                      </Col>
                                      <Col>
                                        <p className="small text-muted mb-1">
                                          Activity %
                                        </p>
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
                            <Card.Header> Update User Information</Card.Header>
                            <Card.Body>
                              <Container typeof="" className="container-fluid">
                                <Row>
                                  <Form onSubmit={handleSubmit}>
                                    <Form.Group className="mb-3">
                                      <Form.Label htmlFor="firstName">
                                        First Name
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder={userDataState.firstName}
                                        name="firstName"
                                        required
                                      />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                      <Form.Label htmlFor="lastName">
                                        Last Name
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder={userData.lastName}
                                        name="lastName"
                                      />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                      <Form.Label
                                        htmlFor="username"
                                        className="mb-3"
                                      >
                                        Username
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder={userDataState.username}
                                        name="username"
                                      />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                      <Form.Label
                                        htmlFor="email"
                                        label="Email address"
                                        className="mb-3"
                                      >
                                        Email
                                      </Form.Label>
                                      <Form.Control
                                        name="email"
                                        type="email"
                                        placeholder={userDataState.email}
                                      />

                                      <Form.Control.Feedback type="invalid">
                                        Email is required!
                                      </Form.Control.Feedback>
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                      <Form.Label>Password</Form.Label>
                                      <Form.Control
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                      />
                                    </Form.Group>

                                    <Form.Group className="mb-3">
                                      <Form.Label htmlFor="avatar">
                                        Avatar
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder="Avatar"
                                        name="avatar"
                                      />
                                    </Form.Group>
                                    <Button type="submit">Save</Button>
                                  </Form>
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
          <Row>
            {userDataState?.savedRecipes?.map((meal) => (
              <RecipeCard meal={meal} key={meal.id} />
            ))}
          </Row>
        </Container>
      </Container>
    </>
  );
}

export default Profile;
