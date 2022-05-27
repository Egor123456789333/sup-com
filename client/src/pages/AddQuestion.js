import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  Form,
  Row,
  Col,
  InputGroup,
  DropdownButton,
  Dropdown,
} from "react-bootstrap";
import CreateCourse from "../components/Modals/CreateCourse";
import CreateTest from "../components/Modals/CreateTest";
import CreateTheory from "../components/Modals/CreateTheory";
import { ADD_TEST } from "../utils/const";
import { useHistory } from "react-router-dom";

{
  /* <AddQuestion
              question={question}
              
              setTest={setTest}
            /> */
}

const AddQuestion = ({ test, setTest }) => {
  //console.log("'''''", test);
  return (
    <div>
      {test.questionTests.map((question, idQuestion) => {
        //console.log(idQuestion);
        return (
          <div className="card p-3 mt-3" key={idQuestion}>
            <Row>
              <Col>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column>{idQuestion + 1}</Form.Label>
                    <Col sm="11">
                      <Form.Control
                        value={question.questionText}
                        onChange={(e) => {
                          let newText = test.questionTests;
                          newText[idQuestion].questionText = e.target.value;
                          setTest((prevState) => ({
                            ...prevState,
                            questionTests: newText,
                          }));
                        }}
                        placeholder={"Введите текст вопроса"}
                      />
                    </Col>
                  </Form.Group>
                </Form>
              </Col>
              <Col xs={2}>
                <InputGroup className="mb-3">
                  <DropdownButton
                    variant="outline-primary"
                    title={question.typeRu}
                    id="input-group-dropdown-1"
                  >
                    <Dropdown.Item
                      onClick={() => {
                        let question = test.questionTests;
                        question[idQuestion].type = "oneAnswer";
                        question[idQuestion].typeRu = "Один ответ";
                        question[idQuestion].disabled = false;

                        question[idQuestion].questionAnswers = [
                          { text: "", rigth: false },
                        ];
                        setTest((prevState) => ({
                          ...prevState,
                          questionTests: question,
                        }));
                      }}
                    >
                      Один ответ
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        let question = test.questionTests;
                        question[idQuestion].type = "oneline";
                        question[idQuestion].typeRu = "Ввод ответа";
                        question[idQuestion].disabled = true;
                        question[idQuestion].questionAnswers = [
                          { answerText: "" },
                        ];
                        setTest((prevState) => ({
                          ...prevState,
                          questionTests: question,
                        }));
                      }}
                    >
                      Ввод ответа
                    </Dropdown.Item>
                  </DropdownButton>
                </InputGroup>
              </Col>
              <Col xs={2}>
                <Button
                  className="w-100"
                  onClick={() => {
                    let answer = test.questionTests;
                    answer[idQuestion].questionAnswers.push({
                      text: "",
                      rigth: false,
                    });
                    setTest((prevState) => ({
                      ...prevState,
                      questionTests: answer,
                    }));
                  }}
                  disabled={question.disabled}
                  variant={"outline-primary"}
                >
                  Добавить ответ
                </Button>
              </Col>
              <Col xs={2}>
                <Button
                  className="w-100"
                  onClick={() => {
                    let questionDel = test.questionTests;
                    ////console.log(id, "  ", answer);
                    questionDel.splice(idQuestion, 1);
                    ////console.log(question);
                    setTest((prevState) => ({
                      ...prevState,
                      questionTests: questionDel,
                    }));
                  }}
                  variant={"outline-danger"}
                >
                  Удалить вопрос
                </Button>
              </Col>
            </Row>

            {question.questionAnswers.map((answer, id) => {
              if (question.type == "oneAnswer") {
                return (
                  <Row className="mt-3" key={id}>
                    <Col
                      xs={8}
                      className="form-check d-flex align-items-center justify-content-between"
                    >
                      <input
                        className="form-check-input"
                        type="radio"
                        name={`forQuestion+${idQuestion}`}
                        checked={answer.rigth}
                        id={id}
                        onChange={() => {
                          let newRight = test.questionTests;

                          newRight[idQuestion].questionAnswers.map(
                            (answer, rightId) => {
                              //console.log("БУБУБУ");
                              if (rightId == id) {
                                answer.rigth = true;
                              } else {
                                answer.rigth = false;
                              }
                            }
                          );
                          setTest((prevState) => ({
                            ...prevState,
                            questionTests: newRight,
                          }));
                        }}
                      />
                      <Form htmlFor={id} className="w-100">
                        <Form.Control
                          value={answer.text}
                          onChange={(e) => {
                            let newText = JSON.parse(
                              JSON.stringify(test.questionTests)
                            );
                            newText[idQuestion].questionAnswers[id].text =
                              e.target.value;
                            setTest((prevState) => ({
                              ...prevState,
                              questionTests: newText,
                            }));
                          }}
                          placeholder={"Введите текст ответа"}
                        />
                      </Form>
                    </Col>

                    <Col xs={4}>
                      <Button
                        className="w-100"
                        onClick={() => {
                          let answerDel = JSON.parse(
                            JSON.stringify(test.questionTests)
                          );
                          //console.log(id, "  ", answer);
                          answerDel[idQuestion].questionAnswers.splice(id, 1);
                          //console.log(question);
                          setTest((prevState) => ({
                            ...prevState,
                            questionTests: answerDel,
                          }));
                        }}
                        variant={"outline-danger"}
                      >
                        Удалить ответ
                      </Button>
                    </Col>
                  </Row>
                );
              } else if (question.type == "oneline") {
                return (
                  <Row className="mt-3" key={id}>
                    <Col className="form-check d-flex align-items-center justify-content-between">
                      <Form htmlFor={id} className="w-100">
                        <Form.Control
                          value={answer.answerText}
                          onChange={(e) => {
                            let newText = JSON.parse(
                              JSON.stringify(test.questionTests)
                            );
                            newText[idQuestion].questionAnswers[id].answerText =
                              e.target.value;
                            setTest((prevState) => ({
                              ...prevState,
                              questionTests: newText,
                            }));
                          }}
                          placeholder={"Введите текст ответа"}
                        />
                      </Form>
                    </Col>
                  </Row>
                );
              }
            })}
          </div>
        );
      })}
    </div>
  );
};

export default AddQuestion;
