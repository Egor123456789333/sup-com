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
  console.log("'''''", oneTest);
  return (
    <div>
      {oneTest.question_tests.map((question, idQuestion) => {
        //console.log(idQuestion);
        return (
          <div className="card p-3 mt-3" key={idQuestion}>
            <Row>
              <Col>
                <Form>
                  <Form.Group as={Row}>
                    <Form.Label column>{question.position}</Form.Label>
                    <Col sm="11">
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
                        question[idQuestion].type = "oneAnswer";
                        question[idQuestion].typeRu = "Один ответ";
                        question[idQuestion].disabled = false;

                        question[idQuestion].questionAnswers = [
                          { text: "", rigth: false },
                        ];
                        setOneTest((prevState) => ({
                          ...prevState,
                          question_tests: question,
                        }));
                      }}
                    >
                      Один ответ
                    </Dropdown.Item>
                    <Dropdown.Item
                      onClick={() => {
                        let question = oneTest.question_tests;
                        console.log(question);
                        question[idQuestion].type = "oneline";
                        question[idQuestion].typeRu = "Ввод ответа";
                        question[idQuestion].disabled = true;
                        question[idQuestion].questionAnswers = [
                          { answerText: "" },
                        ];
                        setOneTest((prevState) => ({
                          ...prevState,
                          question_tests: question,
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
              <Col xs={2}>
                <Button
                  className="w-100"
                  // onClick={() => {
                  //   let questionDel = oneTest.question_tests;
                  //   let delArr = oneTest.deleteQuestion;
                  //   ////console.log(id, "  ", answer);
                  //   delArr.push(questionDel[idQuestion].id);
                  //   questionDel.splice(idQuestion, 1);

                  //   ////console.log(question);
                  //   setOneTest((prevState) => ({
                  //     ...prevState,
                  //     question_tests: questionDel,
                  //     deleteQuestion: delArr,
                  //   }));
                  // }}
                  variant={"outline-danger"}
                >
                  Удалить вопрос
                </Button>
              </Col>
            </Row>
            {question.one_lines.map((answer, id) => {})}
            {/* {question.question_answers.map((answer, id) => {
              return (
                <Row className="mt-3" key={id}>
                  <Col
                    xs={8}
                    className="form-check d-flex align-items-center justify-content-between"
                  >
                    <input
                      // checked={answer.rigth}
                      className="form-check-input"
                      type="radio"
                      //name={`forQuestion+${idQuestion}`}
                      //id={2}
                      // onChange={() => {
                      //   let newRight = oneTest.question_tests;

                      //   newRight[idQuestion].question_answers.map(
                      //     (answer, rightId) => {
                      //       //console.log("БУБУБУ");
                      //       if (rightId == id) {
                      //         answer.rigth = true;
                      //       } else {
                      //         answer.rigth = false;
                      //       }
                      //     }
                      //   );
                      //   console.log(newRight);
                      //   setOneTest((prevState) => ({
                      //     ...prevState,
                      //     question_tests: newRight,
                      //   }));
                      // }}
                    />
                    <Form htmlFor={2} className="w-100">
                      <Form.Control
                        //value={answer.text}
                        // onChange={(e) => {
                        //   let newText = oneTest.question_tests;
                        //   newText[idQuestion].question_answers[id].text =
                        //     e.target.value;
                        //   setOneTest((prevState) => ({
                        //     ...prevState,
                        //     question_tests: newText,
                        //   }));
                        // }}
                        placeholder={"Введите текст ответа"}
                      />
                    </Form>
                  </Col>

                  <Col xs={4}>
                    <Button
                      className="w-100"
                      // onClick={() => {
                      //   let answerDel = oneTest.question_tests;
                      //   let delArr = oneTest.deleteAnswer;
                      //   console.log(oneTest);
                      //   delArr.push(
                      //     answerDel[idQuestion].question_answers[id].id
                      //   );
                      //   answerDel[idQuestion].question_answers.splice(id, 1);

                      //   //console.log(question);
                      //   setOneTest((prevState) => ({
                      //     ...prevState,
                      //     question_tests: answerDel,
                      //     deleteAnswer: delArr,
                      //   }));
                      // }}
                      variant={"outline-danger"}
                    >
                      Удалить ответ
                    </Button>
                  </Col>
                </Row>
              );
            })} */}
          </div>
        );
      })}
    </div>
  );
};

export default AddUpdateQuestion;
