import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";
import CreateCourse from "../components/Modals/CreateCourse";
import CreateTest from "../components/Modals/CreateTest";
import CreateTheory from "../components/Modals/CreateTheory";

const Admin = () => {
  const [courseVisible, setCourseVisible] = useState(false);
  const [testVisible, setTestVisible] = useState(false);
  const [theoryVisible, setTheoryVisible] = useState(false);
  return (
    <Container className="d-flex flex-column ">
      <Button
        onClick={() => setTestVisible(true)}
        variant={"outline-dark"}
        className="mt-4 pt-2"
      >
        Добавить тест
      </Button>
      <Button
        onClick={() => setCourseVisible(true)}
        variant={"outline-dark"}
        className="mt-4 pt-2"
      >
        Добавить курс
      </Button>
      <Button
        onClick={() => setTheoryVisible(true)}
        variant={"outline-dark"}
        className="mt-4 pt-2"
      >
        Добавить теорию
      </Button>
      <CreateTheory
        show={theoryVisible}
        onHide={() => setTheoryVisible(false)}
      />
      <CreateTest show={testVisible} onHide={() => setTestVisible(false)} />

      <CreateCourse
        show={courseVisible}
        onHide={() => setCourseVisible(false)}
      />
    </Container>
  );
};

export default Admin;
