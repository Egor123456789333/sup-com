import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { ListGroup } from "react-bootstrap";
import { Context } from "..";
import { useHistory } from "react-router-dom";
import { THEORY_ROUTE } from "../utils/const";
import { fetchCourse } from "../http/courseApi";
import { fetchTheory } from "../http/theoryApi";

const TypeBar = observer(() => {
  const history = useHistory();
  const [mpiTheory, setMpiTheory] = useState([]);
  const [openMPTheory, setOpenMPTheory] = useState([]);
  const [wasFetch, setWasFetch] = useState(0);

  const { theory } = useContext(Context);

  useEffect(() => {
    let curNum = window.location.pathname.split("/");
    if (curNum[1] == "theory") {
      theory.setSelectedChap(curNum[2]);
    } else {
      theory.setSelectedChap(0);
    }
    let mpi = [];
    let openMp = [];

    theory.chapters.map((chapter) => {
      if (chapter.type == "MPI") {
        mpi.push(chapter);
      } else {
        openMp.push(chapter);
      }
    });

    setMpiTheory(mpi);
    setOpenMPTheory(openMp);
  }, [theory.chapters]);

  useEffect(() => {
    setWasFetch(1);
  }, [mpiTheory, openMPTheory]);

  if (!wasFetch) {
    return <div></div>;
  }
  return (
    <ListGroup>
      <ListGroup.Item>
        <div
          style={{
            textTransform: "uppercase",

            fontWeight: "bold",
          }}
        >
          MPI
        </div>
      </ListGroup.Item>
      {mpiTheory.map((chapter) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={chapter.id == theory.selectedChap}
          key={chapter.id}
          onClick={() => {
            theory.setSelectedChap(chapter.id);
            history.push(THEORY_ROUTE + "/" + chapter.id);
          }}
        >
          <div style={{ paddingLeft: "7px" }}>
            {chapter.chapterNum} {chapter.name}
          </div>
        </ListGroup.Item>
      ))}
      <ListGroup.Item>
        <div
          style={{
            fontWeight: "bold",
          }}
        >
          OpenMP
        </div>
      </ListGroup.Item>
      {openMPTheory.map((chapter) => (
        <ListGroup.Item
          style={{ cursor: "pointer" }}
          active={chapter.id == theory.selectedChap}
          key={chapter.id}
          onClick={() => {
            theory.setSelectedChap(chapter.id);
            history.push(THEORY_ROUTE + "/" + chapter.id);
          }}
        >
          <div style={{ paddingLeft: "7px" }}>
            {chapter.chapterNum} {chapter.name}
          </div>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
});

export default TypeBar;
