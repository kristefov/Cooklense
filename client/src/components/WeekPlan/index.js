// Week Plan

import React from 'react';
import Board from "@asseinfo/react-kanban";
import "@asseinfo/react-kanban/dist/styles.css";
import { Navbar, Nav, a, Container, Col, Row, Image } from 'react-bootstrap';
import { Link } from 'react-router-dom';


const WeekPlan = () => {
    // set modal display state
  
    return (
        <section className="bg-body-tetriary text-tetriary mt-5">
            <Container className="p-3 container-fluid d-flex flex-column align-center">
            <Row className='align-center justify-content-center flex-row'>
                 <h5 className="text-center mt-2 mb-4 text-tetriary">Week Plan</h5>
            </Row>
            <Col className="col-2 text-center">

            </Col>
            </Container>
        </section>
    );
}
export default WeekPlan;