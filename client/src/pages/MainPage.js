import React from "react";
import { Container, Col, Row, Carousel } from "react-bootstrap";
import TypeBar from "../components/TypeBar";

const MainPage = () => {
  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <Carousel variant="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://i07.fotocdn.net/s114/5c287337e4ce83f4/public_pin_l/2582627966.jpg"
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://mms.businesswire.com/media/20160331005753/en/307885/22/OpenMPLogo-rgb.jpg"
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100"
                src="https://miro.medium.com/max/904/1*gTTD0J8UGXH3gA7pSMLlqw.jpeg"
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </Col>
      </Row>
    </Container>
  );
};

export default MainPage;
