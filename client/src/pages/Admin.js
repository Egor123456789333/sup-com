import React, { useState, useContext } from "react";
import { Button, Card, Col, Container, Row } from "react-bootstrap";
import CreateCourse from "../components/Modals/CreateCourse";
import CreateTest from "../components/Modals/CreateTest";
import CreateTheory from "../components/Modals/CreateTheory";
import {
  ADD_COURSE,
  ADD_TEST,
  COURSE_LIST,
  DELETE_TEST,
  UPDATE_TESTS,
  UPDATE_COURSE,
  ADD_THEORY,
  THEORY_LIST,
} from "../utils/const";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import { observer } from "mobx-react-lite";

const Admin = observer(() => {
  const history = useHistory();
  const { user } = useContext(Context);
  const [courseVisible, setCourseVisible] = useState(false);
  const [testVisible, setTestVisible] = useState(false);
  const [theoryVisible, setTheoryVisible] = useState(false);

  return (
    <Container className="d-flex flex-column ">
      <Card className="p-5 mt-2 d-flex justify-content-around">
        <h1>Работа с тестами</h1>
        <Row>
          <Col>
            <Button
              onClick={() => history.push(ADD_TEST)}
              variant={"outline-primary"}
              className="mt-4 pt-2 w-75"
            >
              Добавить тест
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => history.push(UPDATE_TESTS)}
              variant={"outline-success"}
              className="mt-4 pt-2 w-75"
            >
              Редактировать тест
            </Button>
          </Col>
        </Row>
      </Card>
      <Card className="p-5 mt-2 d-flex justify-content-around">
        <h1>Работа с курсами</h1>
        <Row>
          <Col>
            <Button
              onClick={() => history.push(ADD_COURSE)}
              variant={"outline-primary"}
              className="mt-4 pt-2 w-75"
            >
              Добавить курс
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => history.push(COURSE_LIST)}
              variant={"outline-success"}
              className="mt-4 pt-2 w-75"
            >
              Редактировать курс
            </Button>
          </Col>
        </Row>
      </Card>
      <Card className="p-5 mt-2 d-flex justify-content-around">
        <h1>Работа с теорией</h1>
        <Row>
          <Col>
            <Button
              onClick={() => history.push(ADD_THEORY)}
              variant={"outline-primary"}
              className="mt-4 pt-2 w-75"
            >
              Добавить теорию
            </Button>
          </Col>
          <Col>
            <Button
              onClick={() => history.push(THEORY_LIST)}
              variant={"outline-success"}
              className="mt-4 pt-2 w-75"
            >
              Редактировать теорию
            </Button>
          </Col>
        </Row>
      </Card>
    </Container>
  );
});

export default Admin;
