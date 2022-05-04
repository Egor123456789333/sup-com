import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import { fetchOneTest, sendAnswer } from "../http/testApi";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import axios from "axios";

const MainPage = observer(() => {
  const [answer, setAnswers] = useState([]);

  const history = useHistory();
  let curNum = window.location.pathname.split("/");
  console.log(curNum);
  let courseId = curNum[2];
  console.log(courseId);
  const { test } = useContext(Context);

  useEffect(() => {
    test.setOneTest([]);
    fetchOneTest(courseId).then((data) => test.setOneTest(data));
  }, []);

  if (typeof test.oneTest.question_tests == "undefined") {
    return <div></div>;
  }

  const onComleted = () => {
    sendAnswer(answer).then(() => console.log("Отправил"));
  };

  const onAnswer = (answerId, questionId) => {
    let newAnswer = answer;
    for (let i = 0; i < newAnswer.length; i++) {
      if (newAnswer[i][1] == questionId) {
        newAnswer.splice(i, 1);
      }
    }
    newAnswer.push([answerId, questionId]);
    console.log(newAnswer);
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
          {test.oneTest.question_tests.map((question) => {
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
                          onAnswer(answer.id, question.id);
                          console.log(answer.id, question.id);
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
          })}
          <Button
            variant={"outline-success"}
            onClick={() => {
              onComleted();
              console.log(answer);
            }}
          >
            Завершить тест
          </Button>
        </Col>
      </Row>
    </Container>
  );
});

export default MainPage;
