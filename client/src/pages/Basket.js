import React, { useContext, useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import { TEST_ROUTE, UPDATE_COURSE, UPDATE_TEST } from "../utils/const";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import { fetchTest } from "../http/testApi";
import { observer } from "mobx-react-lite";
import { deleteCourse, fetchCourse } from "../http/courseApi";
import { deleteBascetCourse, fetchCourseBascet } from "../http/basketApi";

const Basket = observer(() => {
  const history = useHistory();
  const [basket, setBasket] = useState();
  const { course, user } = useContext(Context);
  useEffect(() => {
    let userBasket = [];
    fetchCourse().then((data) => course.setCourses(data));

    fetchCourseBascet(user._user.id).then((data) => {
      console.log(data);
      setBasket(data.basket_courses);
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
    console.log(userBasket);
  }, []);

  useEffect(() => {
    console.log(basket);
  }, [basket]);

  if (!course.basket.length) {
    return <div>Корзина пуста</div>;
  }
  return (
    <Container>
      <Row className="mt-2">
        <Col>
          <h1>Корзина</h1>
          <div className="list-group">
            {course.basket.map((oneCourse, i) => (
              <a
                key={oneCourse.course.id}
                className="list-group-item list-group-item-action "
                aria-current="true"
                onClick={() => {
                  // history.push(UPDATE_COURSE + "/" + oneCourse.id);
                }}
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">{oneCourse.course.name}</h5>
                </div>

                <small>а тут хызы чо</small>
                <br />
                <Button
                  onClick={() => {
                    let delCour = basket;
                    delCour.splice(i, 1);
                    console.log(delCour);
                    deleteBascetCourse(oneCourse.id).then(() =>
                      course.setBasket(delCour)
                    );
                  }}
                  className="mb-1"
                >
                  Удалить из корзины
                </Button>
              </a>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default Basket;
