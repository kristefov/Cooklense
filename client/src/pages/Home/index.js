import React from 'react';
import { Container, Col, Form, Row, Button } from 'react-bootstrap';
// to be added in form.control later
// {/* value={searchInput} */}
// {/* onChange={(e) => setSearchInput(e.target.value)} */}

const Home = () => {
  return (
    <Container style={{ marginTop: '10vh' }}>
        {/* add onsubmit handler later */}
        <h1>Search for recipes!</h1>
        <Form>
            <Row>
                <Col xs={12} md={8}>
                    <Form.Control
                        name='searchInput'
                        type='text'
                        size='lg'
                        placeholder='Search for a recipe'
                    />
                </Col>
                <Col xs={12} md={4}>
                    <Button type='submit' size='lg'>
                        Search
                    </Button>
                </Col>
            </Row>
        </Form>
    </Container>
  );
};

export default Home;
