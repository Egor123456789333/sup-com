import React, { useContext, useEffect } from "react";
import { Container, Col, Row, Button } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import { TEST_ROUTE, UPDATE_TEST } from "../utils/const";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import { deleteTest, fetchTest } from "../http/testApi";
import { observer } from "mobx-react-lite";

const TestsUpdate = observer(() => {
  const history = useHistory();

  const { test } = useContext(Context);
  useEffect(() => {
    fetchTest(0).then((data) => test.setTests(data));
  }, []);
  console.log(test);

  return (
    <Container>
      <Row className="mt-2">
        <Col>
          <h1>Выберите тест для редактирования</h1>
          <div className="list-group">
            {test.tests.map((oneTest, i) => (
              <a
                key={oneTest.id}
                className="list-group-item list-group-item-action "
                aria-current="true"
                onClick={() => {
                  history.push(UPDATE_TEST + "/" + oneTest.id);
                }}
              >
                <div className="d-flex w-100 justify-content-between">
                  <h5 className="mb-1">
                    {oneTest.chapter}.{oneTest.chapterName}
                  </h5>
                  <Button
                    variant="outline-danger"
                    onClick={(e) => {
                      e.stopPropagation();
                      deleteTest(oneTest.id).then(() => {
                        let newTests = test.tests;
                        newTests.splice(i, 1);
                        test.setTests(newTests);
                      });
                    }}
                  >
                    Удалить
                  </Button>
                </div>
                <p className="mb-1">Мб неинтересно</p>
                <small>SUPCOM</small>
              </a>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default TestsUpdate;
