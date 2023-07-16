// LOGIN FORM
// see SignupForm.js for comments
import React, { useState } from "react";
import { Form, Button, Alert, FloatingLabel } from "react-bootstrap";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../../reducers/authReducer";
const LoginForm = ({ handleModalClose }) => {
  const navigate = useNavigate();
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });
  const [validated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [loginUser] = useMutation(LOGIN_USER);
  const dispatch = useDispatch();
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };
  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const { email, password } = userFormData;
    if (!email || !password) {
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
      const { data } = await loginUser({
        variables: { ...userFormData },
      });
      dispatch(
        login({
          token: data.loginUser.token,
          username: data.loginUser.user.username,
          userId: data.loginUser.user._id,
          email: data.loginUser.user.email,
          avatar: data.loginUser.user.avatar,
          savedRecipes: data.loginUser.user.savedRecipes || [],
        })
      );
      localStorage.setItem("id_token", data.loginUser.token);
      handleModalClose();
      navigate("/");
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }
    setUserFormData({
      email: "",
      password: "",
    });
  };
  return (
    <>
      <Form className="d-flex flex-wrap" autoComplete="off" noValidate validated={validated} onSubmit={handleFormSubmit}>
        <Alert
          dismissible
          onClose={() => setShowAlert(false)}
          show={showAlert}
          variant="danger"
        >
          Something went wrong with your login credentials!
        </Alert>
        <Form.Group className="mb-3 p-2 w-50">
          <FloatingLabel htmlFor="email" label="Email address" className="mb-3">
            <Form.Control
              name="email"
              type="email"
              placeholder="name@example.com"
              onChange={handleInputChange}
              value={userFormData.email}
              required
            />
          </FloatingLabel>
          <Form.Control.Feedback type="invalid">
            Email is required!
          </Form.Control.Feedback>
        </Form.Group>
        <Form.Group className="mb-3 p-2 w-50">
        <FloatingLabel htmlFor="password" label="Password" className="mb-3">
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
        <Form.Group className="mb-1 p-2 col-12">
        <Button className="w-100"
          disabled={!(userFormData.email && userFormData.password)}
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
export default LoginForm;
