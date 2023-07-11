// SIGNUP FORM
import React, { useState } from "react";

import { Form, Button, Alert, FloatingLabel } from "react-bootstrap";

import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";


import Auth from '../../utils/auth';
import { useMutation } from "@apollo/client";
import { ADD_USER } from "../../utils/mutations";
import { signup } from "../../reducers/authReducer";

const SignupForm = () => {
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
            showAlert('field missing or incomplete');
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
            variables: { userData: {...userFormData}  },
        });
        
        const userData = {
          token: Auth.login(data.addUser.token),
          userId: data.addUser.user._id,
          firstName: data.addUser.user.firstName,
          lastName: data.addUser.user.lastName,
          username: data.addUser.user.username,
          email: data.addUser.user.email
      };
      dispatch(signup(userData))
      localStorage.setItem("id_token", data.signup.token);
      navigate('/')
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
      <Form noValidate validated={validated} onSubmit={handleFormSubmit}>
        {/* show alert if server response is bad */}
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your signup!
        </Alert>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="firstName">First Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your First Name"
            name="firstName"
            onChange={handleInputChange}
            value={userFormData.firstName}
            required
          />
          <Form.Control.Feedback type="invalid">
            First Name is required!
          </Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label htmlFor="lastName">Last Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Your Last Name"
            name="lastName"
            onChange={handleInputChange}
            value={userFormData.lastName}
            required
          />
          <Form.Control.Feedback type="invalid">
            Last Name is required!
          </Form.Control.Feedback>




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
            onChange={handleInputChange}
            value={userFormData.username}
            required
             />
        </FloatingLabel>
        <Form.Control.Feedback type="invalid">
            Username is required!
          </Form.Control.Feedback>
          </Form.Group>

        <Form.Group className='mb-3'>
          
          <FloatingLabel
          htmlFor="email"
          label="Email address"
          className="mb-3"
        >
          <Form.Control name="email" type="email" placeholder="name@example.com"
           onChange={handleInputChange}
              value={userFormData.email}
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
            onChange={handleInputChange}
            value={userFormData.password}
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
            onChange={handleInputChange}
            value={userFormData.avatar}
            required
          />
        </Form.Group>

        <Button
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
          variant="success"
        >
          Submit
        </Button>
      </Form>
    </>
  );
};

export default SignupForm;
