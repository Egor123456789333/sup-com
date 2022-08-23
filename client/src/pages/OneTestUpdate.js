import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
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
import {
  createTest,
  fetchOneTest,
  fetchOneTestWithAnswer,
  updateTest,
} from "../http/testApi";
import { observer } from "mobx-react-lite";
import AddUpdateQuestion from "./AddUpdateQuestion";

const OneTestUpdate = observer(() => {
  let question_tests = [,];
  const [oneTest, setOneTest] = useState({
    question_tests: [
      { questionText: "", question_answers: [{ text: "", rigth: "false" }] },
    ],
    chapter: "",
    chapterName: "",
    theoryType: "",
    deleteQuestion: [],
    deleteAnswer: [],
  });
  const [disabled, setDisabled] = useState(true);
  const { test } = useContext(Context);
  useEffect(() => {
    fetchOneTestWithAnswer(courseId).then((data) => {
      console.log(data);
      let newData = data;
      newData.question_tests.map((question) => {
        if (question.type == "oneline") {
          question.disabled = true;
          question.question_answers = [{ text: "", rigth: "false" }];
        } else {
          question.disabled = false;
          question.one_lines = [{ answerText: "" }];
        }
      });
      newData.question_tests.sort(function (a, b) {
        return a.position - b.position;
      });
      //console.log(newData);
      setOneTest((prevState) => ({
        ...prevState,
        id: newData.id,
        question_tests: newData.question_tests,
        chapter: newData.chapter,
        chapterName: newData.chapterName,
        theoryType: newData.theoryType,
      }));
    });
  }, []);

  const history = useHistory();
  let curNum = window.location.pathname.split("/");
  ////console.log(curNum);
  let courseId = curNum[2];
  ////console.log(courseId);
  ////console.log(test);

  // //console.log(oneTest);

  useEffect(() => {
    //console.log("Проверка");
    let counter = 0;
    console.log(oneTest);
    oneTest.question_tests.map((question, idQ) => {
      let wasTrue = false;
      if (question.questionText == "") {
        counter++;
      }
      if (question.position == "") {
        counter++;
      }
      if (question.type == "oneAnswer") {
        question.question_answers.map((answer, id) => {
          if (answer.text == "") {
            counter++;
          }
          if (answer.rigth == true) {
            wasTrue = true;
          }
        });
      } else if (question.type == "oneline") {
        question.one_lines.map((answer, id) => {
          //console.log(answer.answerText);
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
    if (oneTest.chapter == "") {
      counter++;
    }
    if (oneTest.chapterName == "") {
      counter++;
    }
    //console.log("DSAsfsdf", counter);

    if (!counter) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [oneTest]);

  if (oneTest.chapter == "") {
    return <div></div>;
  }
  return (
    <Container className="d-flex flex-column mb-5">
      <Row className="d-flex mt-4">
        <Col md={3}>
          <Form>
            <Form.Control
              type="number"
              value={oneTest.chapter}
              onChange={(e) => {
                setOneTest((prevState) => ({
                  ...prevState,
                  chapter: e.target.value,
                }));
              }}
              placeholder={"Введите номер главы"}
            />
          </Form>
        </Col>
        <Col md={7}>
          <Form className="">
            <Form.Control
              value={oneTest.chapterName}
              onChange={(e) => {
                setOneTest((prevState) => ({
                  ...prevState,
                  chapterName: e.target.value,
                }));
              }}
              placeholder={"Введите название главы"}
            />
          </Form>
        </Col>
        <Col>
          {" "}
          <InputGroup className="mb-3 w-100">
            <DropdownButton
              className=" w-100"
              variant="outline-primary"
              title={oneTest.theoryType}
              id="input-group-dropdown-1"
            >
              <Dropdown.Item
                onClick={() =>
                  setOneTest((prevState) => ({
                    ...prevState,
                    theoryType: "MPI",
                  }))
                }
              >
                MPI
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  setOneTest((prevState) => ({
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
      <AddUpdateQuestion oneTest={oneTest} setOneTest={setOneTest} />
      <Row className="mt-4">
        <Col md={3}>
          <Button
            className="w-100"
            variant={"outline-primary"}
            onClick={() => {
              let question = JSON.parse(JSON.stringify(oneTest.question_tests));
              //console.log(question);
              question.push({
                one_lines: [],
                disabled: false,
                position: question.length + 1,
                type: "oneAnswer",
                typeRu: "Один ответ",
                questionText: "",
                question_answers: [{ text: "", rigth: false }],
                one_lines: [{ answerText: "" }],
              });
              setOneTest((prevState) => ({
                ...prevState,
                question_tests: question,
              }));
            }}
          >
            Добавить вопрос
          </Button>
        </Col>
        <Col md={{ offset: 6 }}>
          <Button
            onClick={() => {
              updateTest(oneTest);
              history.push(ADMIN_ROUTE);
            }}
            disabled={disabled}
            className=" w-100"
            variant={"outline-primary"}
          >
            Редактировать тест
          </Button>
        </Col>
      </Row>
    </Container>
  );
});

export default OneTestUpdate;
