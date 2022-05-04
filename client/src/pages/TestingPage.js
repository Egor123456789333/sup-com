import React, { useContext, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import { TEST_ROUTE } from "../utils/const";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import { fetchTest } from "../http/testApi";
import { observer } from "mobx-react-lite";

const TestingPage = observer(() => {
  const history = useHistory();

  const { test } = useContext(Context);
  useEffect(() => {
    fetchTest().then((data) => test.setTests(data));
  }, []);
  console.log(test);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <h1>Тесты</h1>
          <div className="list-group">
            {test.tests.map((test) => (
              <a
                key={test.id}
                href="#"
                className="list-group-item list-group-item-action "
                aria-current="true"
                onClick={() => {
                  history.push(TEST_ROUTE + "/" + test.id);
                }}
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">
                    {test.chapter}.{test.chapterName}
                  </h5>
                  <small>Вы его не решали</small>
                </div>
                <p className="mb-1">Мб интересно</p>
                <small>а тут хызы чо</small>
              </a>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default TestingPage;
