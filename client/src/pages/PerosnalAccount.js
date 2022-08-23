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
  Card,
  Image,
  FormLabel,
} from "react-bootstrap";
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
import { changeName, changeSurname, check } from "../http/userApi";

const PersonalAccount = observer(() => {
  let question_tests = [,];
  const [userInfo, setUserInfo] = useState("");
  const [disabled, setDisabled] = useState(true);
  const [imgAvatar, setImgAvatar] = useState(
    "https://static.tildacdn.com/tild6333-6666-4435-a132-306132353439/no_foto.png"
  );
  const { user } = useContext(Context);
  console.log(user);
  useEffect(() => {
    setUserInfo(user._user);
    // fetchOneTestWithAnswer(courseId).then((data) => {
    //   console.log(data);
    //   let newData = data;
    //   newData.question_tests.map((question) => {
    //     if (question.type == "oneline") {
    //       question.disabled = true;
    //       question.question_answers = [{ text: "", rigth: "false" }];
    //     } else {
    //       question.disabled = false;
    //       question.one_lines = [{ answerText: "" }];
    //     }
    //   });
    //   newData.question_tests.sort(function (a, b) {
    //     return a.position - b.position;
    //   });
    //   //console.log(newData);
    //   setOneTest((prevState) => ({
    //     ...prevState,
    //     id: newData.id,
    //     question_tests: newData.question_tests,
    //     chapter: newData.chapter,
    //     chapterName: newData.chapterName,
    //     theoryType: newData.theoryType,
    //   }));
    // });
  }, []);

  const history = useHistory();
  let curNum = window.location.pathname.split("/");
  ////console.log(curNum);
  let courseId = 1;
  ////console.log(courseId);
  ////console.log(test);

  // //console.log(oneTest);

  useEffect(() => {
    console.log(userInfo);
    // if userInfo.img
  }, [userInfo]);

  useEffect(() => {
    console.log(user._user);
  }, [user._user]);

  if (userInfo == "") {
    return <div></div>;
  }
  return (
    <Container className="d-flex flex-column mb-5">
      <Row className="d-flex mt-4">
        <Col md={3}>
          <Card className="p-3">
            <Image className="mb-3" src={imgAvatar} />
            {userInfo.email}
          </Card>
        </Col>
        <Col md={9}>
          <Row className="mb-3">
            <Col md={10}>
              <Form className="">
                <Row>
                  {" "}
                  <Form.Label>Имя</Form.Label>
                </Row>
                <Row>
                  {" "}
                  <Col>
                    <Form.Control
                      value={userInfo.name}
                      onChange={(e) => {
                        setUserInfo((prevState) => ({
                          ...prevState,
                          name: e.target.value,
                        }));
                      }}
                      placeholder={"Введите новое имя"}
                    />
                  </Col>
                  <Col>
                    <Button
                      onClick={() => {
                        changeName(userInfo.email, userInfo.name).then(
                          (data) => {
                            user.setUser(data);
                          }
                        );
                      }}
                    >
                      Сохранить
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
          <Row className="mb-3">
            <Col md={10}>
              <Form className="">
                <Row>
                  {" "}
                  <Form.Label>Фамилия</Form.Label>
                </Row>
                <Row>
                  {" "}
                  <Col>
                    <Form.Control
                      value={userInfo.surname}
                      onChange={(e) => {
                        setUserInfo((prevState) => ({
                          ...prevState,
                          surname: e.target.value,
                        }));
                      }}
                      placeholder={"Введите новую фамилию"}
                    />
                  </Col>
                  <Col>
                    <Button
                      onClick={() => {
                        changeSurname(userInfo.email, userInfo.surname).then(
                          (data) => {
                            user.setUser(data);
                          }
                        );
                      }}
                    >
                      Сохранить
                    </Button>
                  </Col>
                </Row>
              </Form>
            </Col>
          </Row>
        </Col>
      </Row>
    </Container>
  );
});

export default PersonalAccount;
