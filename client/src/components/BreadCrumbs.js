import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Collapse from 'react-bootstrap/Collapse';
import Fade from 'react-bootstrap/Fade';
import {
  Container,
  Col,
  Form,
  Row,
  Button,
  InputGroup,
  FormControl,
  Alert,
  Card,
  Breadcrumb

} from "react-bootstrap";

const BreadCrumbsiteComponent = () => {
return (
    <>
            <Container fluid-direction='row'>
                <Col><Row>
        <Breadcrumb separator={"-->"}>

          <Breadcrumb.Item href="/">
            Back to Search
          </Breadcrumb.Item>
          <Breadcrumb.Item active to={Link}>
           Result: Geeks for Geeks
          </Breadcrumb.Item>
        </Breadcrumb>
        </Row></Col>
        </Container>
    </>
  );
};

export default BreadCrumbsiteComponent;
