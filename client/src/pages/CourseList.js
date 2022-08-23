import React, { useContext, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import { TEST_ROUTE, UPDATE_COURSE, UPDATE_TEST } from "../utils/const";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import { fetchTest } from "../http/testApi";
import { observer } from "mobx-react-lite";
import { deleteCourse, fetchCourse } from "../http/courseApi";

const CourseList = observer(() => {
  const history = useHistory();

  const { course } = useContext(Context);
  useEffect(() => {
    fetchCourse().then((data) => course.setCourses(data));
  }, []);
  console.log(course);

  return (
    <Container>
      <Row className="mt-2">
        <Col>
          <h1>Выберите курс для редактирования</h1>
          <div className="list-group">
            {course.courses.map((oneCourse, i) => (
              <a
                key={oneCourse.id}
                className="list-group-item list-group-item-action "
                aria-current="true"
                onClick={() => {
                  history.push(UPDATE_COURSE + "/" + oneCourse.id);
                }}
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{oneCourse.name}</h5>
                  <Button
                    variant="outline-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteCourse(oneCourse.id).then(() => {
                        let newCourses = course.courses;
                        newCourses.splice(i, 1);
                        course.setCourses(newCourses);
                      });
                    }}
                  >
                    Удалить
                  </Button>
                </div>
                <p className="mb-1">Мб неинтересно</p>
                <small>SUPCOM</small>
              </a>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default CourseList;
