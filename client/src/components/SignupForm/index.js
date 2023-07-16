// SIGNUP FORM
import React, { useState } from "react";

import { Form, Button, Alert, FloatingLabel } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signup } from "../../reducers/authReducer";
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";

const SignupForm = ({ handleModalClose }) => {
  // set initial form state
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    avatar: "",
  });
  // set state for form validation
  const [validated] = useState(false);
  // set state for alert
  const [showAlert, setShowAlert] = useState(false);
  // define mutation
  const [addUser] = useMutation(ADD_USER);

  const dispatch = useDispatch();

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { firstName, lastName, username, email, password } = userFormData;
    if (!firstName || !lastName || !username || !email || !password) {
      setShowAlert(true);
      showAlert("field missing or incomplete");
      return;
    }

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await addUser({
        variables: { userData: { ...userFormData } },
      });

      const userData = {
        token: data.addUser.token,
        userId: data.addUser.user._id,
        firstName: data.addUser.user.firstName,
        lastName: data.addUser.user.lastName,
        username: data.addUser.user.username,
        email: data.addUser.user.email,
        savedRecipes: data.addUser.user.savedRecipes || [],
      };
      dispatch(signup(userData));
      localStorage.setItem("id_token", data.addUser.token);
      handleModalClose();
      navigate("/");
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      firstName: "",
      lastName: "",
      username: "",
      email: "",
      password: "",
      avatar: "",
    });
  };

  return (
    <>
      {/* This is needed for the validation functionality above */}
      <Form noValidate autoComplete="off" validated={validated} onSubmit={handleFormSubmit} className="d-flex flex-row flex-wrap">
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>
        <Form.Group className="mb-1 w-50 p-2" >
        <FloatingLabel
            htmlFor="firstname"
            label="Your Firstname"
            className="mb-3"
          >
          <Form.Control
            type="text"
            placeholder="Your First Name"
            name="firstName"
            onChange={handleInputChange}
            required
          />
          </FloatingLabel>
          <Form.Control.Feedback type="invalid">
            First Name is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-1 w-50 p-2">
        <FloatingLabel
            htmlFor="lastname"
            label="Your Lastname"
            className="mb-3"
          >
          <Form.Control
            type="text"
            placeholder="Your Last Name"
            name="lastName"
            onChange={handleInputChange}
            required
          />
        </FloatingLabel>
          <Form.Control.Feedback type="invalid">
            Last Name is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-1 w-50 p-2">
          <FloatingLabel
            htmlFor="username"
            label="Your Username"
            className="mb-3"
          >
            <Form.Control
              type="text"
              placeholder="Your username"
              name="username"
              onChange={handleInputChange}
               required
            />
          </FloatingLabel>
          <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-1 w-50 p-2">
          <FloatingLabel htmlFor="email" label="Email address" className="mb-1">
            <Form.Control
              name="email"
              type="email"
              placeholder="name@example.com"
              onChange={handleInputChange}
                      required
            />
          </FloatingLabel>
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-1 p-2 w-50">

        <FloatingLabel
            htmlFor="password"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleInputChange}
                          required
            />
      </FloatingLabel>
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-1 p-2 w-50">

        <FloatingLabel
            htmlFor="password"
            label="Password"
            className="mb-3"
          >
            <Form.Control
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleInputChange}
                          required
            />
      </FloatingLabel>
          <Form.Control.Feedback type="invalid">
            Password is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-1 p-2 w-50">
          <Form.Label htmlFor="avatar">Avatar</Form.Label>
          <Form.Control
     
            type="text"
            placeholder="Avatar"
            name="avatar"
            onChange={handleInputChange}
                  required
          />
        </Form.Group>
        <Form.Group className="mb-1 p-2 w-50">
          <Form.Label htmlFor="avatar">File for Avatar</Form.Label>
          <Form.Control
     
            type="file"
            placeholder="Avatar"
            name="avatar"
            onChange={handleInputChange}
                  
          />
        </Form.Group>
        <Form.Group className="mb-1 p-2 col-12">
        <Button className="w-100"
          disabled={
            !(
              userFormData.firstName &&
              userFormData.lastName &&
              userFormData.username &&
              userFormData.email &&
              userFormData.password
            )
          }
          type="submit"
          variant="primary"
        >
          Submit
        </Button>
      </Form.Group>
      </Form>
    </>
  );
};

export default SignupForm;
