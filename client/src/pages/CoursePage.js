import React, { useContext, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import { TEST_ROUTE, UPDATE_COURSE, UPDATE_TEST } from "../utils/const";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import { fetchTest } from "../http/testApi";
import { observer } from "mobx-react-lite";
import { deleteCourse, fetchCourse } from "../http/courseApi";
import { createBasketCourse, fetchCourseBascet } from "../http/basketApi";

const CoursePage = observer(() => {
  const history = useHistory();

  const { course, user } = useContext(Context);
  useEffect(() => {
    fetchCourse().then((data) => course.setCourses(data));
    fetchCourseBascet(user._user.id).then((data) => {
      console.log(data);

      course.setBasket(data.basket_courses);
      // let fetchBasket = data.basket_courses;
      // fetchBasket.map((basketCourse) => {
      //   console.log(user);

      //   course.courses.map((oneCourse) => {
      //     console.log(oneCourse);
      //     if (oneCourse.id == basketCourse.courseId) {
      //       userBasket.push(oneCourse);
      //     }
      //   });
      // });
    });
  }, []);
  console.log(course);

  return (
    <Container>
      <Row className="mt-2">
        <Col>
          <h1>Список доступных курсов</h1>
          <div className="list-group">
            {course.courses.map((oneCourse, i) => (
              <div
                key={oneCourse.id}
                className="list-group-item list-group-item-action "
                aria-current="true"
                onClick={() => {
                  // history.push(UPDATE_COURSE + "/" + oneCourse.id);
                }}
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{oneCourse.name}</h5>
                </div>

                <small>SUPCOM</small>
                <br />
                <Button
                  onClick={() => {
                    createBasketCourse(oneCourse.id, user._user.id);
                  }}
                  className="mb-1"
                >
                  Добавить в корзину
                </Button>
              </div>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default CoursePage;
