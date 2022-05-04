import { observer } from "mobx-react-lite";
import React, { useContext, useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "..";
import { useHistory } from "react-router-dom";
import { COURSE_ROUTE } from "../utils/const";
import { fetchCourse } from "../http/courseApi";

const TypeBar = observer(() => {
  const history = useHistory();

  const { course } = useContext(Context);

  useEffect(() => {
    fetchCourse().then((data) => course.setCourses(data));
  }, []);

  console.log("dsfd");

  return (
    <ListGroup>
      {course.courses.map((type) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={type.id === course.selectedType.id}
          key={type.id}
          onClick={() => {
            course.setSelectedType(type);
            history.push(COURSE_ROUTE + "/" + type.id);
          }}
        >
          {type.name}
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
