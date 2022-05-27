import React, { useEffect, useState, useContext } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import CreateCourse from "../components/Modals/CreateCourse";
import CreateTest from "../components/Modals/CreateTest";
import CreateTheory from "../components/Modals/CreateTheory";
import { ADD_TEST, ADMIN_ROUTE } from "../utils/const";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import AddQuestion from "./AddQuestion";
import { createTest } from "../http/testApi";
import {
  createCourse,
  fetchCourse,
  updateCourse,
  updateCourseWithoutImage,
} from "../http/courseApi";
import { observer } from "mobx-react-lite";

const UpdateCourse = observer(() => {
  const { course } = useContext(Context);
  let curNum = window.location.pathname.split("/");
  console.log("fsddgfdg", course);
  //console.log(curNum);
  let courseId = curNum[2];

  const ref = React.createRef();
  const [disabled, setDisabled] = useState(true);
  const [imgPath, setImgPath] = useState();
  const [oneCourse, setOneCourse] = useState({
    img: null,
    name: "",
    price: "",
    authorInfo: "gggg",
  });

  useEffect(() => {
    fetchCourse().then((data) => {
      console.log(data.find((course) => course.id == courseId));
      let courseF = data.find((course) => course.id == courseId);
      setOneCourse(courseF);
      setImgPath(courseF.img);
      course.setCourses(data);
    });
  }, []);

  const selectFiles = (e) => {
    console.log(e.target.files);
  };

  useEffect(() => {
    console.log(oneCourse);

    let counter = 0;

    if (oneCourse.name == "") {
      counter++;
    }
    if (oneCourse.price == "") {
      counter++;
    }
    if (oneCourse.authorInfo == "") {
      counter++;
    }
    if (oneCourse.img == "") {
      counter++;
    }
    //console.log("DSAsfsdf", counter);
    if (!counter) {
      setDisabled(false);
    } else {
      setDisabled(true);
    }
  }, [oneCourse]);

  const history = useHistory();

  //console.log(test);
  if (oneCourse.img == null) {
    return <div></div>;
  }
  return (
    <Container className="d-flex flex-column mb-5">
      <Form className="mt-4">
        <Form.Control
          value={oneCourse.name}
          onChange={(e) => {
            setOneCourse((prevState) => ({
              ...prevState,
              name: e.target.value,
            }));
          }}
          placeholder={"Введите название курса"}
        />
      </Form>

      <Form className="mt-4 ">
        <Form.Control
          value={oneCourse.price}
          type="number"
          onChange={(e) => {
            setOneCourse((prevState) => ({
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
              console.log(typeof ref.current.files[0]);
              setOneCourse((prevState) => ({
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
            console.log(typeof oneCourse.img);

            formData.append("name", oneCourse.name);
            formData.append("price", oneCourse.price);
            formData.append("img", oneCourse.img);
            formData.append("id", oneCourse.id);
            formData.append("imgPath", imgPath);
            formData.append("authorInfo", oneCourse.authorInfo);
            if (typeof oneCourse.img != "string") {
              updateCourse(formData);
            } else {
              updateCourseWithoutImage(formData);
            }
            history.push(ADMIN_ROUTE);
          }}
          disabled={disabled}
          className="mt-3 w-25"
          variant={"outline-primary"}
        >
          Редактировать курс
        </Button>
      </div>
    </Container>
  );
});

export default UpdateCourse;
