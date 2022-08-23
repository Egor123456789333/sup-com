import React, { useContext, useEffect, useState } from "react";
import { Context } from "..";
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
import { Trash } from "react-bootstrap-icons";
import CreateCourse from "../components/Modals/CreateCourse";
import CreateTest from "../components/Modals/CreateTest";
import CreateTheory from "../components/Modals/CreateTheory";
import { ADD_TEST } from "../utils/const";
import { useHistory } from "react-router-dom";

{
  /* <AddQuestion
              question={question}
              
              setOneTest={setOneTest}
            /> */
}

const AddUpdateQuestion = ({ oneTest, setOneTest }) => {
  const { test } = useContext(Context);
  //console.log("'''''", oneTest);
  return (
    <div>
      {oneTest.question_tests.map((question, idQuestion) => {
        return (
          <div className="card p-3 mt-3" key={idQuestion}>
            <Row>
              <Col>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column>{question.position}</Form.Label>
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
                        let question = oneTest.question_tests;
                        console.log(oneTest);
                        let delArr = oneTest.deleteQuestion;
                        if (question[idQuestion].type != "oneAnswer") {
                          if (
                            question[idQuestion].id != 0 &&
                            typeof question[idQuestion].id != undefined
                          ) {
                            console.log("может не надо?");
                            delArr.push(question[idQuestion].id);
                            question[idQuestion].id = 0;
                          }
                          question[idQuestion].type = "oneAnswer";
                          question[idQuestion].typeRu = "Один ответ";
                          question[idQuestion].disabled = false;

                          question[idQuestion].question_answers = [
                            { text: "", rigth: false },
                          ];
                        }

                        setOneTest((prevState) => ({
                          ...prevState,
                          question_tests: question,
                          deleteQuestion: delArr,
                        }));
                      }}
                    >
                      Один ответ
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        let question = oneTest.question_tests;
                        console.log(question);
                        let delArr = oneTest.deleteQuestion;
                        if (question[idQuestion].type != "oneline") {
                          if (
                            question[idQuestion].id != 0 &&
                            typeof question[idQuestion].id != undefined
                          ) {
                            console.log("может не надо?");
                            delArr.push(question[idQuestion].id);
                            question[idQuestion].id = 0;
                          }

                          console.log(idQuestion, "  ", question);
                          question[idQuestion].type = "oneline";
                          question[idQuestion].typeRu = "Ввод ответа";
                          question[idQuestion].disabled = true;
                          question[idQuestion].one_lines[0].answerText = "";
                          question[idQuestion].question_answers = [
                            { text: "", rigth: "false" },
                          ];
                        }

                        setOneTest((prevState) => ({
                          ...prevState,
                          question_tests: question,
                          deleteQuestion: delArr,
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
                    let questionDel = oneTest.question_tests;
                    let delArr = oneTest.deleteQuestion;
                    ////console.log(id, "  ", answer);
                    delArr.push(questionDel[idQuestion].id);
                    questionDel.splice(idQuestion, 1);
                    questionDel.map((question, i) => {
                      question.position = i + 1;
                    });
                    ////console.log(question);
                    setOneTest((prevState) => ({
                      ...prevState,
                      question_tests: questionDel,
                      deleteQuestion: delArr,
                    }));
                  }}
                  variant={"outline-danger"}
                >
                  Удалить вопрос
                </Button>
              </Col>
            </Row>
            <Row>
              <Col sm="10">
                <Form.Control
                  value={question.questionText}
                  onChange={(e) => {
                    let newText = oneTest.question_tests;
                    newText[idQuestion].questionText = e.target.value;
                    setOneTest((prevState) => ({
                      ...prevState,
                      question_tests: newText,
                    }));
                  }}
                  placeholder={"Введите текст вопроса"}
                />
              </Col>
              <Col>
                <Button
                  className="w-100"
                  onClick={() => {
                    let answer = oneTest.question_tests;
                    answer[idQuestion].question_answers.push({
                      text: "",
                      rigth: false,
                    });
                    setOneTest((prevState) => ({
                      ...prevState,
                      question_tests: answer,
                    }));
                  }}
                  disabled={question.disabled}
                  variant={"outline-primary"}
                >
                  Добавить ответ
                </Button>
              </Col>
            </Row>
            {question.question_answers.map((answer, id) => {
              console.log(question.type);
              if (question.type == "oneAnswer") {
                return (
                  <Row className="mt-3" key={id}>
                    <Col
                      xs={11}
                      className="form-check d-flex align-items-center justify-content-between"
                    >
                      <input
                        checked={answer.rigth}
                        className="form-check-input"
                        type="radio"
                        name={`forQuestion+${idQuestion}`}
                        id={answer.id}
                        onChange={() => {
                          let newRight = oneTest.question_tests;

                          newRight[idQuestion].question_answers.map(
                            (answer, rightId) => {
                              //console.log("БУБУБУ");
                              if (rightId == id) {
                                answer.rigth = true;
                              } else {
                                answer.rigth = false;
                              }
                            }
                          );
                          console.log(newRight);
                          setOneTest((prevState) => ({
                            ...prevState,
                            question_tests: newRight,
                          }));
                        }}
                      />
                      <Form htmlFor={answer.id} className="w-100">
                        <Form.Control
                          value={answer.text}
                          onChange={(e) => {
                            let newText = oneTest.question_tests;
                            newText[idQuestion].question_answers[id].text =
                              e.target.value;
                            setOneTest((prevState) => ({
                              ...prevState,
                              question_tests: newText,
                            }));
                          }}
                          placeholder={"Введите текст ответа"}
                        />
                      </Form>
                    </Col>

                    <Col xs={1}>
                      <Button
                        className="w-100"
                        onClick={() => {
                          let answerDel = oneTest.question_tests;
                          let delArr = oneTest.deleteAnswer;
                          console.log(oneTest);
                          delArr.push(
                            answerDel[idQuestion].question_answers[id].id
                          );
                          answerDel[idQuestion].question_answers.splice(id, 1);

                          //console.log(question);
                          setOneTest((prevState) => ({
                            ...prevState,
                            question_tests: answerDel,
                            deleteAnswer: delArr,
                          }));
                        }}
                        variant={"outline-danger"}
                      >
                        <Trash></Trash>
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
                          value={question.one_lines[0].answerText}
                          onChange={(e) => {
                            let newText = JSON.parse(
                              JSON.stringify(oneTest.question_tests)
                            );
                            newText[idQuestion].one_lines[0].answerText =
                              e.target.value;
                            setOneTest((prevState) => ({
                              ...prevState,
                              question_tests: newText,
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

export default AddUpdateQuestion;
