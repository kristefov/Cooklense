// Week Plan

import React from 'react';

import { Navbar, Nav, Container, Col, Row, Image } from 'react-bootstrap';


const WeekPlan = () => {
    // set modal display state
  
    return (
        <section className="bg-body-tetriary text-tetriary mt-5">
            <Container className="p-3 container-fluid d-flex flex-column align-center">
            <Row className='align-center justify-content-center flex-row'>
                 <h5 className="text-center mt-2 mb-4 text-tetriary">Week Plan</h5>
            </Row>
            <col className="col-2 text-center">
                {recipes.map((recipe) => (
                <a href={recipe.link}
                key={recipe.id}>
                    <col className="col-2 text-center">
                        <img className="" src={recipe.image} alt="recipe images"/>
                        <p className="">
                            {recipe.title}
                        </p>
                    </col>
                </a>
                ))}
            </col>
            </Container>
        </section>
    );
}
