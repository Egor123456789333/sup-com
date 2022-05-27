import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import { fetchOneTest, sendAnswer } from "../http/testApi";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import axios from "axios";
import { CHECK_ROUTE } from "../utils/const";
import { fetchChapter } from "../http/theoryApi";

const Theory = observer(() => {
  const { theory } = useContext(Context);

  let curNum = window.location.pathname.split("/");

  let courseId = curNum[2];

  useEffect(() => {
    fetchChapter(courseId).then((data) => theory.setChapter(data));
  }, []);

  useEffect(() => {
    fetchChapter(courseId).then((data) => theory.setChapter(data));
  }, [theory.selectedChap]);

  if (theory.chapter.text == "") {
    return <div></div>;
  }
  return (
    <Container className="mt-2">
      <Row>
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <h1>{theory.chapter.name}</h1>
          <div dangerouslySetInnerHTML={{ __html: theory.chapter.text }}></div>
        </Col>
      </Row>
    </Container>
  );
});

export default Theory;
