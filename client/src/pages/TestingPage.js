import React, { useContext, useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import { TEST_ROUTE } from "../utils/const";
import { useHistory } from "react-router-dom";
import { Context } from "..";
import { fetchResults, fetchTest } from "../http/testApi";
import { observer } from "mobx-react-lite";

const TestingPage = observer(() => {
  const history = useHistory();
  const [results, setResults] = useState([]);

  const { test, user } = useContext(Context);
  useEffect(() => {
    console.log(user._user.id);
    if (user._isAuth) {
      let userId = user._user.id;
      fetchTest(userId).then((data) => {
        console.log(data);
        test.setTests(data.tests);
        setResults(data.userResults);
      });
    } else {
      let userId = 0;
      fetchTest(userId).then((data) => test.setTests(data));
    }
  }, []);
  console.log(test);
  useEffect(() => {
    console.log(results);
  }, [results]);

  const checkResults = (test) => {
    if (!user._isAuth) {
      return;
    }
    let res;
    let color;
    res = results?.find((result) => result.testId == test.id)?.rigthAnswers;
    console.log(res);

    if (!res) {
      res = "Вы не решали этот тест";
    } else {
      res = (res * 100).toFixed();
      if (res < 50) {
        color = "red";
      } else if (res < 70 && res > 50) {
        color = "orange";
      } else {
        color = "green";
      }
      res = res + "%";
    }
    return (
      <small>
        <font color={color}>{res}</font>
      </small>
    );
  };

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
                  <small>{checkResults(test)}</small>
                </div>
                <p className="mb-1"></p>
              </a>
            ))}
          </div>
        </Col>
      </Row>
    </Container>
  );
});

export default TestingPage;
