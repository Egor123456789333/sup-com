import React, { useContext, useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import {
  TEST_ROUTE,
  UPDATE_COURSE,
  UPDATE_CHAPTER,
  UPDATE_THEORY,
} from "../utils/const";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import { fetchTest } from "../http/testApi";
import { observer } from "mobx-react-lite";
import { deleteCourse, fetchCourse } from "../http/courseApi";
import { deleteTheory, fetchTheory } from "../http/theoryApi";

const TheoryList = observer(() => {
  const history = useHistory();
  const [mpiTheory, setMpiTheory] = useState([]);
  const [openMPTheory, setOpenMPTheory] = useState([]);
  const [wasFetch, setWasFetch] = useState(0);
  const { theory } = useContext(Context);
  useEffect(() => {
    let mpi = [];
    let openMp = [];
    fetchTheory().then((data) => {
      theory.setChapters(data);
    });
    theory.chapters.map((chapter) => {
      if (chapter.type == "MPI") {
        mpi.push(chapter);
      } else {
        openMp.push(chapter);
      }
    });
    setMpiTheory(mpi);
    setOpenMPTheory(openMp);
    console.log(theory);
  }, []);
  console.log(theory);

  return (
    <Container>
      <Row className="mt-2">
        <Col>
          <h1>Выберите главу для редактирования</h1>
          <div className="list-group">
            {theory.chapters.map((oneTheory, i) => (
              <a
                key={oneTheory.id}
                className=" list-group-item list-group-item-action  "
                aria-current="true"
                onClick={() => {
                  history.push(UPDATE_THEORY + "/" + oneTheory.id);
                }}
              >
                <div className="d-flex w-100 justify-content-between pb-3">
                  <h5 className="mb-1 ">{oneTheory.name}</h5>
                  <Button
                    variant="outline-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTheory(oneTheory.id).then(() => {
                        let newCourses = theory.chapters;
                        newCourses.splice(i, 1);
                        theory.setChapters(newCourses);
                      });
                    }}
                  >
                    Удалить
                  </Button>
                </div>
                <p className="mb-1">Тема: {oneTheory.type}</p>
              </a>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default TheoryList;
