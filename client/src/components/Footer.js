// NAVBAR
import React from "react";

import { Navbar, Nav, Container, Col, Row, Image } from "react-bootstrap";

const Footer = () => {
  // set modal display state

  return (
    <>
      <footer className="bg-body-tetriary text-tetriary mt-5">
        <Container className="p-3 container-fluid d-flex flex-column align-center">
          <Row className="align-center justify-content-center flex-row">
            <h5 className="text-center mt-2 mb-4 text-tetriary">Created by:</h5>
            <Row className="row  col-8 p-3 container-fluid justify-content-center align-items-center d-flex flex-row align-center">
              <Col className="col-2 text-center ">
                <a
                  className="nav-link d-flex flex-column-reverse flex-wrap align-center justify-content-center align-items-center"
                  href="https://github.com/dexit"
                >
                  <Image
                    width="32"
                    className="rounded-circle"
                    src="https://avatars.githubusercontent.com/u/6205151?s=64&v=4"
                  ></Image>{" "}
                  dExIT
                </a>
              </Col>
              <Col className="col-2 text-center">
                <a
                  className="nav-link d-flex flex-column-reverse flex-wrap align-center justify-content-center align-items-center"
                  href="https://github.com/kristiyantefov"
                >
                  <Image
                    width="32"
                    className="rounded-circle"
                    src="https://avatars.githubusercontent.com/u/49992946?s=64&v=4"
                  ></Image>{" "}
                  Kristiyantefov
                </a>
              </Col>
              <Col className="col-2 text-center">
                <a
                  className="nav-link d-flex flex-column-reverse flex-wrap align-center justify-content-center align-items-center"
                  href="https://github.com/Abstynent"
                >
                  <Image
                    width="32"
                    className="rounded-circle"
                    src="https://avatars.githubusercontent.com/u/87772337?s=64&v=4"
                  ></Image>
                  Abstynent
                </a>
              </Col>
              <Col className="col-2 text-center">
                <a
                  className="nav-link d-flex flex-column-reverse flex-wrap align-center justify-content-center align-items-center"
                  href="https://github.com/Abstynent"
                >
                  <Image
                    width="32"
                    className="rounded-circle"
                    src="https://avatars.githubusercontent.com/u/87772337?s=64&v=4"
                  ></Image>{" "}
                  Yvonne
                </a>
              </Col>
              <Col className="col-2 text-center">
                <a
                  className="nav-link d-flex flex-column-reverse flex-wrap align-center justify-content-center align-items-center"
                  href="https://github.com/Abstynent"
                >
                  <Image
                    width="32"
                    className="rounded-circle"
                    src="https://avatars.githubusercontent.com/u/87772337?s=64&v=4"
                  ></Image>{" "}
                  Adina
                </a>
              </Col>
            </Row>
          </Row>
          <Row className="align-center mt-5">
            <Col>
              <p className="text-center text-tetriary w-100">
                Copyright © 2023 All rights reserved Cooklense
              </p>
            </Col>
          </Row>
        </Container>
      </footer>
    </>
  );
};

export default Footer;
