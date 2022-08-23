import React, { useEffect, useState } from "react";
import {
  Dropdown,
  Button,
  Container,
  Form,
  Row,
  Col,
  InputGroup,
  DropdownButton,
} from "react-bootstrap";
import { ADD_TEST, ADMIN_ROUTE } from "../utils/const";
import { useHistory } from "react-router-dom";
import AddQuestion from "./AddQuestion";
import { createTest } from "../http/testApi";

const AddTest = () => {
  let questionTests = [,];
  const [disabled, setDisabled] = useState(true);
  const [disabledPos, setDisabledPos] = useState(true);

  const [test, setTest] = useState({
    questionTests: [
      {
        disabled: false,
        position: 1,
        type: "oneAnswer",
        typeRu: "Один ответ",
        questionText: "",
        questionAnswers: [{ text: "", rigth: false }],
      },
    ],
    chapter: "",
    chapterName: "",
    theoryType: "MPI",
  });
  useEffect(() => {}, []);

  useEffect(() => {
    let counter = 0;
    test.questionTests.map((question, idQ) => {
      let wasTrue = false;
      if (question.questionText == "") {
        counter++;
      }
      if (question.position == "") {
        counter++;
      }
      if (question.type == "oneAnswer") {
        question.questionAnswers.map((answer, id) => {
          if (answer.text == "") {
            counter++;
          }
          if (answer.rigth == true) {
            wasTrue = true;
          }
        });
      } else if (question.type == "oneline") {
        question.questionAnswers.map((answer, id) => {
          if (answer.answerText == "") {
            counter++;
          }
          wasTrue = true;
        });
      }

      if (!wasTrue) {
        counter++;
      }
    });
    if (test.chapter == "") {
      counter++;
    }
    if (test.chapterName == "") {
      counter++;
    }
    if (test.questionTests.length > 1) {
      setDisabledPos(false);
    } else {
      setDisabledPos(true);
    }

    if (!counter) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [test]);

  const history = useHistory();

  if (typeof test == "undefined") {
    return <div></div>;
  }
  return (
    <Container className="d-flex flex-column mb-5">
      <Row className="d-flex mt-4">
        <Col md={3}>
          <Form>
            <Form.Control
              type="number"
              onChange={(e) => {
                setTest((prevState) => ({
                  ...prevState,
                  chapter: e.target.value,
                }));
              }}
              placeholder={"Введите номер главы"}
            />
          </Form>
        </Col>
        <Col md={7}>
          <Form>
            <Form.Control
              onChange={(e) => {
                setTest((prevState) => ({
                  ...prevState,
                  chapterName: e.target.value,
                }));
              }}
              placeholder={"Введите название главы"}
            />
          </Form>
        </Col>
        <Col>
          <InputGroup className="mb-3 w-100">
            <DropdownButton
              className=" w-100"
              variant="outline-primary"
              title={test.theoryType}
              id="input-group-dropdown-1"
            >
              <Dropdown.Item
                onClick={() =>
                  setTest((prevState) => ({
                    ...prevState,
                    theoryType: "MPI",
                  }))
                }
              >
                MPI
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  setTest((prevState) => ({
                    ...prevState,
                    theoryType: "OpenMP",
                  }))
                }
              >
                OpenMP
              </Dropdown.Item>
            </DropdownButton>
          </InputGroup>
        </Col>
      </Row>
      <AddQuestion test={test} setTest={setTest} />

      <Row className="mt-4">
        {" "}
        <Col md={3}>
          <Button
            className="w-100"
            variant={"outline-primary"}
            onClick={(e) => {
              let question = test.questionTests;
              question.push({
                disabled: false,
                position: question.length + 1,
                type: "oneAnswer",
                typeRu: "Один ответ",
                questionText: "",
                questionAnswers: [{ text: "", rigth: false }],
              });
              setTest((prevState) => ({
                ...prevState,
                questionTests: question,
              }));
            }}
          >
            Добавить вопрос
          </Button>
        </Col>
        <Col md={{ offset: 6 }}>
          <Button
            className="w-100"
            onClick={() => {
              createTest(test);
              history.push(ADMIN_ROUTE);
            }}
            disabled={disabled}
            variant={"outline-primary"}
          >
            Сохранить тест
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default AddTest;
