import React from "react";
import { Container, Col, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";

const MainPage = () => {
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}></Col>
      </Row>
    </Container>
  );
};

export default MainPage;
