import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import CreateCourse from "../components/Modals/CreateCourse";
import CreateTest from "../components/Modals/CreateTest";
import CreateTheory from "../components/Modals/CreateTheory";
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
  });
  useEffect(() => {}, []);

  useEffect(() => {
    //console.log("МЕНЯЙСЯ");
    console.log(test);
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
          console.log(answer.answerText);
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
    //console.log("DSAsfsdf", counter);
    if (!counter) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [test]);

  const history = useHistory();

  //console.log(test);
  if (typeof test == "undefined") {
    return <div></div>;
  }
  return (
    <Container className="d-flex flex-column mb-5">
      <Form className="mt-4">
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
      <Row className="d-flex mt-4">
        <Col>
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
        <Col xs={4}>
          <Button
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
      </Row>
      <AddQuestion test={test} setTest={setTest} />

      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            createTest(test);
            history.push(ADMIN_ROUTE);
          }}
          disabled={disabled}
          className="mt-3 w-25"
          variant={"outline-primary"}
        >
          Добавить тест
        </Button>
      </div>
    </Container>
  );
};

export default AddTest;
