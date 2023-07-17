import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect, useMemo } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { UPDATE_USER } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";
// import RecipeCard from "../../components/RecipeCard";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Profile() {
  const { data, loading } = useQuery(GET_ME);
  const [updateUser] = useMutation(UPDATE_USER);
  const userDataState = data?.me;


  const count = useMemo(() => {
    if (!userDataState?.savedRecipes) {
      return 0;
    }
    const countArray = userDataState.savedRecipes;
    let count = 0;
    for (let i = 0; i < countArray.length; i++) {
      // if entity is object, increase objectsLen by 1, which is the stores the total number of objects in array.
      if (countArray[i] instanceof Object) {
        count++;
      }
    }
    return count;
  }, [userDataState?.savedRecipes]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.target;
    const formData = Object.fromEntries(
      Array.from(new FormData(form).entries()).filter(([, value]) =>
        Boolean(value)
      )
    );
    console.log(formData);
    try {
      await updateUser({ variables: { userData: formData } });
      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  if (loading) {
    return <h2>loading</h2>;
  }

  return (
    <>
      <Container as="main" className="h-100 mt-5 mb-5 px-5">

        <Container>
          <Row>
            <Col>
              <Col>
                <Row>
                  <Container className="section">
                    <Container className="container py-5 ">
                      
                      <Row className="row d-flex justify-content-start align-items-start ">
                      <Row>
          <h1>Profile</h1>
        </Row>
                        <Col className="col col-md-4 col-lg-4 col-xl-4">

                          <Card className="card">
                            <Card.Body className="card-body p-0">
                              <Row className="d-flex flex-column">
                                <Col>
                                  <Row
                                    className="mb-3"
                                    style={{
                                      background: {
                                        backgroundSize: "cover",
                                        backgroundImage: `url(${userDataState.avatar})`,
                                      },
                                    }}
                                  >
                                    <Card.Img
                                      xs={2}
                                      src={userDataState.avatar}
                                      alt="Generic placeholder image"
                                      className="img-fluid"
                                    />
                                  </Row>
                                  <Col className="flex-grow-1 ms-3">
                                    <h5 className="mb-1">
                                      {userDataState.username}
                                    </h5>
                                    <p className="mb-2 pb-1">
                                      {userDataState.firstName}{" "}
                                      {userDataState.lastName}
                                    </p>

                                    <Col className="d-flex justify-content-start rounded-3 p-2 mb-2">
                                      <Col>
                                        <p className="small text-muted mb-1">
                                          Collections
                                        </p>
                                        <p className="mb-0">{count}</p>
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
                            <Card.Header>Update User Information</Card.Header>
                            <Card.Body>
                              <Container typeof="" className="container-fluid">
                                <Row>
                                  <Form
                                    className="d-flex flex-row flex-grow-0 flex-wrap gap-0 align-items-center justify-content-between"
                                    autoComplete="off"
                                    onSubmit={handleSubmit}
                                  >
                                    <Form.Group className="mb-3 col-xs-12 col-md-6 col-lg-6 px-3 input-group-lg">
                                      <Form.Label htmlFor="firstName">
                                        First Name
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder={userDataState.firstName}
                                        autoComplete="off"
                                        name="firstName"
                                      />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-xs-12 col-md-6 col-lg-6 px-3 input-group-lg">
                                      <Form.Label htmlFor="lastName">
                                        Last Name
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        placeholder={userDataState.lastName}
                                        name="lastName"
                                        autoComplete="off"
                                      />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-xs-12 col-md-6 col-lg-6 px-3 input-group-lg">
                                      <Form.Label
                                        htmlFor="username"
                                        className="mb-3"
                                      >
                                        Username
                                      </Form.Label>
                                      <Form.Control
                                        type="text"
                                        autoComplete="off"
                                        placeholder={userDataState.username}
                                        name="username"
                                      />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-xs-12 col-md-6 col-lg-6 px-3 input-group-lg">
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

                                    <Form.Group className="mb-3 col-xs-12 col-md-6 col-lg-6 px-3 input-group-lg">
                                      <Form.Label>Password</Form.Label>
                                      <Form.Control
                                        name="password"
                                        type="password"
                                        placeholder="Password"
                                      />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-xs-12 col-md-6 col-lg-6 px-3 input-group-lg">
                                      <Form.Label>Confirm Password</Form.Label>
                                      <Form.Control
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                      />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-xs-12 col-md-6 col-lg-6 px-3 input-group-lg">
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
          {/* <Row>
            {userDataState?.savedRecipes?.map((meal, i) => (
              <RecipeCard meal={meal} key={i} />
            ))}
          </Row> */}
        </Container>
      </Container>
    </>
  );
}

export default Profile;
