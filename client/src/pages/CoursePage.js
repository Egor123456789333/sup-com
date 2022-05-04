import React, { useContext, useEffect } from "react";
import { Container, Col, Row, Image, Card, Button } from "react-bootstrap";
import { Context } from "..";
import TypeBar from "../components/TypeBar";
import { fetchCourse } from "../http/courseApi";
import { observer } from "mobx-react-lite";

const CoursePage = observer(() => {
  const { course } = useContext(Context);

  useEffect(() => {
    fetchCourse().then((data) => course.setCourses(data));
  }, []);
  console.log(course);
  console.log(window.location.href);
  let curNum = window.location.pathname.split("/");
  console.log(curNum);
  let courseId = curNum[2];
  console.log(courseId);
  if (!course.courses.length) {
    return <div></div>;
  }
  return (
    <Container className="mt-2">
      <Row>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={3}>
          <Image
            width={300}
            height={300}
            src={
              process.env.REACT_APP_API_URL +
              course.courses.find((course) => course.id == courseId).img
            }
          />
        </Col>
        <Col md={3}>
          <Row>
            <h2>
              {course.courses.find((course) => course.id == courseId).name}
            </h2>
            <div className="d-flex align-items-center justify-content-center">
              {course.courses.find((course) => course.id == courseId).price}
            </div>
          </Row>
        </Col>
        <Col md={3}>
          <Card
            className="d-flex flex-column align-items-center justify-content-around"
            style={{
              width: 300,
              height: 300,
              fontSize: 32,
              border: "5px solid lightgray",
            }}
          >
            <Button variant={"outline-dark"}>Добавить в корзину</Button>
          </Card>
        </Col>
      </Row>
    </Container>
  );
});

export default CoursePage;
