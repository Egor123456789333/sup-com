import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import { fetchOneTest, sendAnswer } from "../http/testApi";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import axios from "axios";

const CheckPage = observer(() => {
  const [answer, setAnswers] = useState([]);
  let rigthPoint = 0;
  const history = useHistory();
  let curNum = window.location.pathname.split("/");

  let courseId = curNum[2];

  const { test } = useContext(Context);

  useEffect(() => {}, []);

  if (!test.answer.length) {
    return <div></div>;
  }

  if (test.answer.length) {
    test.answer.forEach((answer) => {
      if (answer[3] == true) {
        rigthPoint++;
      }
    });
  }

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <h1>{test.oneTest.chapterName}</h1>
          {test.oneTest.question_tests.map((question) => {
            let counter = 0;

            if (question.type == "oneAnswer") {
              return (
                <div className="card p-3 mb-3" key={question.id}>
                  <h4>{question.questionText}</h4>

                  {question.question_answers.map((answer) => {
                    let colorAnswer = "";

                    for (let i = 0; i < test.answer.length; i++) {
                      if (
                        test.answer[i][1] == question.id &&
                        test.answer[i][3] == true &&
                        test.answer[i][0] == answer.id &&
                        test.answer[i][2] == "oneAnswer"
                      ) {
                        colorAnswer = "green";
                      } else if (
                        test.answer[i][1] == question.id &&
                        test.answer[i][3] != true &&
                        test.answer[i][0] == answer.id &&
                        test.answer[i][2] == "oneAnswer"
                      ) {
                        colorAnswer = "red";
                      } else if (
                        test.answer[i][1] == question.id &&
                        test.answer[i][3] == answer.id &&
                        test.answer[i][2] == "oneAnswer"
                      ) {
                        colorAnswer = "green";
                      }
                    }
                    return (
                      <div key={answer.id} className="form-check">
                        <label className="form-check-label" htmlFor={answer.id}>
                          <font color={colorAnswer}>{answer.text}</font>
                        </label>
                      </div>
                    );
                  })}
                </div>
              );
            } else if (question.type == "oneline") {
              for (let i = 0; i < test.answer.length; i++) {
                if (
                  test.answer[i][1] == question.id &&
                  test.answer[i][3] == true &&
                  test.answer[i][2] == "oneline"
                ) {
                  return (
                    <div className="card p-3 mb-3" key={question.id}>
                      <h4>{question.questionText}</h4>
                      <div
                        key={question.one_lines[0].id}
                        className="form-check"
                      >
                        <label
                          className="form-check-label"
                          htmlFor={question.one_lines[0].id}
                        >
                          <font>
                            Ваш ответ
                            <font color="green"> {test.answer[i][0]}</font>
                          </font>
                        </label>
                      </div>
                    </div>
                  );
                } else if (
                  test.answer[i][1] == question.id &&
                  test.answer[i][3] == false &&
                  test.answer[i][2] == "oneline"
                ) {
                  return (
                    <div className="card p-3 mb-3" key={question.id}>
                      <h4>{question.questionText}</h4>
                      <div key={answer.id} className="">
                        <label className="form-check-label" htmlFor={answer.id}>
                          <font>
                            Ваш ответ{" "}
                            <font color="red">{test.answer[i][0]} </font>,
                            верный ответ{" "}
                            <font color="green"> {test.answer[i][4]}</font>{" "}
                          </font>
                        </label>
                      </div>
                    </div>
                  );
                }
              }
            }
          })}
          <div>
            Верных ответов {rigthPoint} / {test.oneTest.question_tests.length}
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default CheckPage;
