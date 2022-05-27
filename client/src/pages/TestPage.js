import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Col, Row, Button, Form } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import { fetchOneTest, sendAnswer } from "../http/testApi";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import axios from "axios";
import { CHECK_ROUTE } from "../utils/const";

const TestPage = observer(() => {
  const [answer, setAnswers] = useState([]);
  const [disabledButton, setDisabledButton] = useState(true);

  const history = useHistory();
  let curNum = window.location.pathname.split("/");
  //console.log(curNum);
  let courseId = curNum[2];
  //console.log(courseId);
  const { test, user } = useContext(Context);

  useEffect(() => {
    test.setOneTest([]);
    fetchOneTest(courseId).then((data) => test.setOneTest(data));
  }, []);

  if (typeof test.oneTest.question_tests == "undefined") {
    return <div></div>;
  }

  const onComleted = () => {
    sendAnswer({ answer, user, courseId }).then((data) => test.setAnswer(data));
    history.push(CHECK_ROUTE);
  };

  const onAnswer = (answerId, questionId, questionType) => {
    let newAnswer = answer;
    for (let i = 0; i < newAnswer.length; i++) {
      if (newAnswer[i][1] == questionId) {
        newAnswer.splice(i, 1);
      }
    }
    if (answerId != "") {
      newAnswer.push([answerId, questionId, questionType]);
    }

    console.log(newAnswer);
    if (newAnswer.length == test.oneTest.question_tests.length) {
      setDisabledButton(false);
    } else {
      setDisabledButton(true);
    }
    setAnswers(newAnswer);
  };

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <h1>{test.oneTest.chapterName}</h1>
          {test.oneTest.question_tests.map((question, i) => {
            if (question.type == "oneAnswer") {
              return (
                <div className="card p-3 mb-3" key={question.id}>
                  <h4>{question.questionText}</h4>
                  {question.question_answers.map((answer) => {
                    return (
                      <div key={answer.id} className="form-check">
                        <input
                          className="form-check-input"
                          type="radio"
                          name={`forQuestion+${question.id}`}
                          id={answer.id}
                          onChange={() => {
                            onAnswer(answer.id, question.id, question.type);
                            //console.log(answer.id, question.id);
                          }}
                        />
                        <label className="form-check-label" htmlFor={answer.id}>
                          {answer.text}
                        </label>
                      </div>
                    );
                  })}
                </div>
              );
            } else if (question.type == "oneline") {
              console.log(question);
              return (
                <div className="card p-3 mb-3" key={question.id}>
                  <h4>{question.questionText}</h4>
                  <Form htmlFor={question.id} className="w-100">
                    <Form.Control
                      onChange={(e) => {
                        console.log(e.target.value);

                        onAnswer(e.target.value, question.id, question.type);
                      }}
                      placeholder={"Введите текст ответа"}
                    />
                  </Form>
                </div>
              );
            }
          })}
          <Button
            variant={"outline-success"}
            onClick={() => {
              onComleted();
              //console.log(answer);
            }}
            disabled={disabledButton}
          >
            Завершить тест
          </Button>
        </Col>
      </Row>
    </Container>
  );
});

export default TestPage;
