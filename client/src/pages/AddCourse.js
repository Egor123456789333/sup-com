import React, { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import CreateCourse from "../components/Modals/CreateCourse";
import CreateTest from "../components/Modals/CreateTest";
import CreateTheory from "../components/Modals/CreateTheory";
import { ADD_TEST, ADMIN_ROUTE } from "../utils/const";
import { useHistory } from "react-router-dom";
import AddQuestion from "./AddQuestion";
import { createTest } from "../http/testApi";
import { createCourse } from "../http/courseApi";

const AddCourse = () => {
  let questionTests = [,];
  const ref = React.createRef();
  const [disabled, setDisabled] = useState(true);

  const [course, setCourse] = useState({
    img: null,
    name: "",
    price: "",
    authorInfo: "gggg",
  });
  useEffect(() => {}, []);

  const selectFiles = (e) => {
    console.log(e.target.files);
  };

  useEffect(() => {
    console.log(course);

    let counter = 0;

    if (course.name == "") {
      counter++;
    }
    if (course.price == "") {
      counter++;
    }
    if (course.authorInfo == "") {
      counter++;
    }
    if (course.img == "") {
      counter++;
    }
    //console.log("DSAsfsdf", counter);
    if (!counter) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [course]);

  const history = useHistory();

  //console.log(test);
  if (typeof course == "undefined") {
    return <div></div>;
  }
  return (
    <Container className="d-flex flex-column mb-5">
      <Form className="mt-4">
        <Form.Control
          onChange={(e) => {
            setCourse((prevState) => ({
              ...prevState,
              name: e.target.value,
            }));
          }}
          placeholder={"Введите название курса"}
        />
      </Form>

      <Form className="mt-4 ">
        <Form.Control
          type="number"
          onChange={(e) => {
            setCourse((prevState) => ({
              ...prevState,
              price: e.target.value,
            }));
          }}
          placeholder={"Введите цену курса"}
        />
      </Form>

      <Form className="mt-4 ">
        <Form.Group
          onChange={(e) => {
            console.log(e);
          }}
          controlId="formFileMultiple"
          className="mb-3"
        >
          <Form.Label>Добавте изображение курса</Form.Label>
          <Form.Control
            onChange={(e) => {
              selectFiles(e);
              console.log(ref.current.files[0]);
              setCourse((prevState) => ({
                ...prevState,
                img: e.target.files[0],
              }));
            }}
            ref={ref}
            type="file"
            multiple
          />
        </Form.Group>
      </Form>

      <div className="d-flex justify-content-end">
        <Button
          onClick={() => {
            const formData = new FormData();
            console.log(course.img);
            formData.append("name", course.name);
            formData.append("price", course.price);
            formData.append("img", course.img);
            formData.append("authorInfo", course.authorInfo);
            createCourse(formData);
            history.push(ADMIN_ROUTE);
          }}
          disabled={disabled}
          className="mt-3 w-25"
          variant={"outline-primary"}
        >
          Добавить курс
        </Button>
      </div>
    </Container>
  );
};

export default AddCourse;
