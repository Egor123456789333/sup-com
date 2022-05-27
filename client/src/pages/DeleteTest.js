import React, { useContext, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import { TEST_ROUTE } from "../utils/const";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import { fetchTest, deleteTest } from "../http/testApi";
import { observer } from "mobx-react-lite";

const DeleteTest = observer(() => {
  const history = useHistory();

  const { test } = useContext(Context);
  useEffect(() => {
    fetchTest().then((data) => test.setTests(data));
  }, []);
  console.log(test.tests);

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <h1>Тесты</h1>
          <div className="list-group">
            {test.tests.map((oneTest, i) => (
              <a
                key={oneTest.id}
                href="#"
                className="list-group-item list-group-item-action "
                aria-current="true"
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">
                    {oneTest.chapter}.{oneTest.chapterName}
                  </h5>
                  <small>
                    <Button
                      variant="outline-danger"
                      onClick={() => {
                        deleteTest(oneTest.id).then(() => {
                          let newTests = test.tests;
                          newTests.splice(i, 1);
                          test.setTests(newTests);
                        });
                      }}
                    >
                      Удалить
                    </Button>
                  </small>
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

export default DeleteTest;
