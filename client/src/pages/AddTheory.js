import React, { useEffect, useState, useRef } from "react";
import {
  Dropdown,
  Button,
  Container,
  Form,
  Row,
  Col,
  Card,
  InputGroup,
  DropdownButton,
  FormControl,
} from "react-bootstrap";
import CreateCourse from "../components/Modals/CreateCourse";
import CreateTest from "../components/Modals/CreateTest";
import CreateTheory from "../components/Modals/CreateTheory";
import { ADD_TEST, ADMIN_ROUTE } from "../utils/const";
import { useHistory } from "react-router-dom";
import AddQuestion from "./AddQuestion";
import { createTest } from "../http/testApi";
import { createCourse } from "../http/courseApi";
import draftToHtml from "draftjs-to-html";
import { EditorState, ContentState, convertToRaw } from "draft-js";
import htmlToDraft from "html-to-draftjs";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";

import { createTheory } from "../http/theoryApi";

const AddTheory = () => {
  let questionTests = [,];
  const ref = React.createRef();
  const [disabled, setDisabled] = useState(true);
  const [editorState, setEditorState] = useState("");
  const [content, setContent] = useState("");
  const [type, setType] = useState("Выберите тип теории");
  const [theory, setTheory] = useState({
    chapterNum: null,
    name: "",
    price: "",
    type: "Выберите тип теории",
  });
  useEffect(() => {}, []);

  const selectFiles = (e) => {
    console.log(e.target.files);
  };

  useEffect(() => {
    //console.log(theory);

    let counter = 0;

    if (theory.name == "") {
      counter++;
    }
    if (theory.text == "<p></p>\n") {
      counter++;
    }
    if (theory.type == "Выберите тип теории") {
      counter++;
    }
    if (theory.chapterNum == "") {
      counter++;
    }
    //console.log("DSAsfsdf", counter);
    if (!counter) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [theory]);

  const history = useHistory();

  //console.log(test);
  if (typeof theory == "undefined") {
    return <div></div>;
  }
  return (
    <Container className="d-flex flex-column mb-5">
      <Row className="d-flex mt-4">
        <Col xs={9}>
          <Form>
            <Form.Control
              type="number"
              onChange={(e) => {
                setTheory((prevState) => ({
                  ...prevState,
                  chapterNum: e.target.value,
                }));
              }}
              placeholder={"Введите номер главы"}
            />
          </Form>
        </Col>
        <Col>
          <InputGroup className="mb-3">
            <DropdownButton
              variant="outline-primary"
              title={theory.type}
              id="input-group-dropdown-1"
            >
              <Dropdown.Item
                onClick={() =>
                  setTheory((prevState) => ({
                    ...prevState,
                    type: "MPI",
                  }))
                }
              >
                MPI
              </Dropdown.Item>
              <Dropdown.Item
                onClick={() =>
                  setTheory((prevState) => ({
                    ...prevState,
                    type: "OpenMP",
                  }))
                }
              >
                OpenMP
              </Dropdown.Item>
            </DropdownButton>
          </InputGroup>
        </Col>
      </Row>
      <Form className="mt-3">
        <Form.Control
          onChange={(e) => {
            setTheory((prevState) => ({
              ...prevState,
              name: e.target.value,
            }));
          }}
          placeholder={"Введите название главы"}
        />
      </Form>

      <Card className="mt-5  ">
        <Editor
          editorState={editorState}
          toolbarClassName="toolbarClassName"
          wrapperClassName="wrapperClassName"
          editorClassName="editorClassName"
          onEditorStateChange={(e) => {
            setContent(draftToHtml(convertToRaw(e.getCurrentContent())));
            setTheory((prevState) => ({
              ...prevState,
              text: draftToHtml(convertToRaw(e.getCurrentContent())),
            }));
            console.log(convertToRaw(e.getCurrentContent()));
            setEditorState(e);
          }}
        />
      </Card>

      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            const formData = new FormData();

            formData.append("name", theory.name);
            formData.append("text", theory.text);
            formData.append("chapterNum", theory.chapterNum);
            formData.append("type", theory.type);
            createTheory(formData);
            history.push(ADMIN_ROUTE);
          }}
          disabled={disabled}
          className="mt-3 w-25"
          variant={"outline-primary"}
        >
          Добавить теорию
        </Button>
      </div>
    </Container>
  );
};

export default AddTheory;
