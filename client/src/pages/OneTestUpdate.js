import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
import { Button, Container, Form, Row, Col } from "react-bootstrap";

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
        }
      });
      setOneTest((prevState) => ({
        ...prevState,
        id: newData.id,
        question_tests: newData.question_tests,
        chapter: newData.chapter,
        chapterName: newData.chapterName,
      }));
    });
  }, []);

  const history = useHistory();
  let curNum = window.location.pathname.split("/");
  //console.log(curNum);
  let courseId = curNum[2];
  //console.log(courseId);
  //console.log(test);

  // console.log(oneTest);

  useEffect(() => {
    console.log("Проверка");
    let counter = 0;
    console.log(oneTest);
    // oneTest.question_tests.map((question, idQ) => {
    //   let wasTrue = false;
    //   if (question.questionText == "") {
    //     counter++;
    //   }
    //   question.question_answers.map((answer, id) => {
    //     if (answer.text == "") {
    //       console.log("Текста нет ", id, idQ);
    //       counter++;
    //     }
    //     if (answer.rigth == true) {
    //       wasTrue = true;
    //     }
    //   });
    //   if (!wasTrue) {
    //     console.log("Вопроса нет");
    //     counter++;
    //   }
    // });
    if (oneTest.chapter == "") {
      counter++;
    }
    if (oneTest.chapterName == "") {
      counter++;
    }
    console.log("DSAsfsdf", counter);

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
      <Form className="mt-4">
        <Form.Control
          // value={oneTest.chapterName}
          // onChange={(e) => {
          //   setOneTest((prevState) => ({
          //     ...prevState,
          //     chapterName: e.target.value,
          //   }));
          // }}
          placeholder={"Введите название главы"}
        />
      </Form>
      <Row className="d-flex mt-4">
        <Col>
          <Form>
            <Form.Control
              type="number"
              // value={oneTest.chapter}
              // onChange={(e) => {
              //   setOneTest((prevState) => ({
              //     ...prevState,
              //     chapter: e.target.value,
              //   }));
              // }}
              placeholder={"Введите номер главы"}
            />
          </Form>
        </Col>
        <Col xs={4}>
          <Button
            variant={"outline-primary"}
            // onClick={(e) => {
            //   let question = oneTest.question_tests;
            //   question.push({
            //     questionText: "",
            //     question_answers: [{ text: "", rigth: false }],
            //   });
            //   setOneTest((prevState) => ({
            //     ...prevState,
            //     question_tests: question,
            //   }));
            // }}
          >
            Добавить вопрос
          </Button>
        </Col>
      </Row>
      <AddUpdateQuestion oneTest={oneTest} setOneTest={setOneTest} />
      <div className="d-flex justify-content-end">
        <Button
          // onClick={() => {
          //   updateTest(oneTest);
          //   history.push(ADMIN_ROUTE);
          // }}
          // disabled={disabled}
          className="mt-3 w-25"
          variant={"outline-primary"}
        >
          Редактировать тест
        </Button>
      </div>
    </Container>
  );
});

export default OneTestUpdate;
