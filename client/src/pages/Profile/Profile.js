import { useMutation, useQuery } from "@apollo/client";
import React, { useState, useEffect, useMemo } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function Profile() {
  const { data, loading } = useQuery(GET_ME);
  const [updateUser] = useMutation(UPDATE_USER);
  const userDataState = data?.me;

  console.log(userDataState);

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

  //  const [userDataState, setUserDataState] = useState();

  // useEffect(() => {
  //   if (userData) {
  //     setUserDataState(userData);
  //   }
  // }, [userData]);
  // if (!userDataState) {
  //   return <div>Loading...</div>;
  // }
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

  console.log(count);

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
                                  <Row
                                    className="mb-3"
                                    style={{
                                      background: {
                                        backgroundRepeat: "no-repeat",
                                        backgroundSize: "cover",
                                        backgroundImage: `url(${userDataState.avatar} }}`,
                                      },
                                    }}
                                  >
                                    <Card.Img
                                      xs={2}
                                      src={userDataState.avatar}
                                      alt="Generic placeholder image"
                                      className="img-fluid"
                                      roundedCircle
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
                                        required
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
                                        required
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
                                        required
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
                                        required
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
                                        required
                                      />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-xs-12 col-md-6 col-lg-6 px-3 input-group-lg">
                                      <Form.Label>Confirm Password</Form.Label>
                                      <Form.Control
                                        name="confirmPassword"
                                        type="password"
                                        placeholder="Confirm Password"
                                        required
                                      />
                                    </Form.Group>

                                    <Form.Group className="mb-3 col-xs-12 col-md-6 col-lg-6 px-3 input-group-lg">
                                      <Form.Label htmlFor="avatar">
                                        Avatar
                                      </Form.Label>
                                      <Col className="d-flex">
                                        <Form.Control
                                          type="text"
                                          placeholder={userDataState.avatar}
                                          name="avatar"
                                          value={userDataState.avatar}
                                        />
                                        <Image
                                          width="64px"
                                          className="img-fluid w-25"
                                          height="64px"
                                          src={userDataState.avatar}
                                        />
                                      </Col>
                                    </Form.Group>
                                    <Col className="mb-3 col-xs-12 col-md-6 col-lg-6 px-3">
                                      <Button type="submit">Save</Button>
                                    </Col>
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
