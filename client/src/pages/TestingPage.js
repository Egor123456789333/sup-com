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
  const [testMpi, setTestMpi] = useState([]);
  const [testOpenMP, setTestOpenMP] = useState([]);

  const { test, user } = useContext(Context);
  useEffect(() => {
    if (user._isAuth) {
      let userId = user._user.id;
      fetchTest(userId).then((data) => {
        console.log(data);
        let mpi = [];
        let openMp = [];

        data.tests.map((test) => {
          if (test.theoryType == "MPI") {
            mpi.push(test);
          } else {
            openMp.push(test);
          }
        });

        test.setTests(data.tests);
        mpi.sort(function (a, b) {
          return a.chapter - b.chapter;
        });
        openMp.sort(function (a, b) {
          return a.chapter - b.chapter;
        });
        setTestMpi(mpi);
        setTestOpenMP(openMp);
        setResults(data.userResults);
      });
    } else {
      let userId = 0;
      fetchTest(userId).then((data) => {
        console.log(data);
        let mpi = [];
        let openMp = [];

        data.map((test) => {
          if (test.theoryType == "MPI") {
            mpi.push(test);
          } else {
            openMp.push(test);
          }
        });

        test.setTests(data.tests);
        mpi.sort(function (a, b) {
          return a.chapter - b.chapter;
        });
        openMp.sort(function (a, b) {
          return a.chapter - b.chapter;
        });
        setTestMpi(mpi);
        setTestOpenMP(openMp);

        test.setTests(data);
      });
    }
  }, []);

  const checkResults = (test) => {
    if (!user._isAuth) {
      return;
    }
    let res;
    let color;
    res = results?.find((result) => result.testId == test.id)?.rigthAnswers;

    if (res == undefined) {
      res = "Вы не решали этот тест";
    } else {
      res = (res * 100).toFixed();
      if (res < 50) {
        color = "red";
      } else if (res < 70 && res >= 50) {
        color = "orange";
      } else {
        color = "green";
      }
      res = res + "%";
    }
    return <font color={color}>{res}</font>;
  };

  return (
    <Container>
      <Row className="mt-2">
        <Col md={3}>
          <TypeBar />
        </Col>
        <Col md={9}>
          <h1>Тесты</h1>
          <h3>MPI</h3>
          <div className="list-group">
            {testMpi.map((test) => (
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
                  <div>{checkResults(test)}</div>
                </div>
                <p className="mb-1"></p>
              </a>
            ))}
          </div>
          <h3 className="mb-2">OpenMP</h3>
          <div className="list-group">
            {testOpenMP.map((test) => (
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
                  <div>{checkResults(test)}</div>
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
