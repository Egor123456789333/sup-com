import React, { useContext, useEffect } from "react";
import { Context } from "..";
import UserStore from "../store/UserStore";
import {
  Nav,
  Navbar,
  Container,
  NavLink,
  Button,
  Row,
  Col,
} from "react-bootstrap";
import {
  MAIN_ROUTE,
  ADMIN_ROUTE,
  LOGIN_ROUTE,
  TESTING_ROUTE,
  COURSE_ROUTE,
} from "../utils/const";
import { observer } from "mobx-react-lite";

import { useHistory } from "react-router-dom";
import { check } from "../http/userApi";

const NavBar = observer(() => {
  const { user } = useContext(Context);
  const history = useHistory();

  useEffect(() => {
    check().then((data) => console.log(data));
    console.log(user.user);
  }, []);

  const logOut = () => {
    user.setUser({});
    user.setIsAuth(false);
    localStorage.setItem("token", "");
    history.push(LOGIN_ROUTE);
  };

  return (
    <Navbar bg="dark" variant="dark">
      <Container>
        <a style={{ color: "white", textDecoration: "none" }} href={MAIN_ROUTE}>
          SupCom
        </a>
        <Row>
          <Col>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(TESTING_ROUTE)}
            >
              Тесты
            </Button>
          </Col>
          <Col>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(COURSE_ROUTE)}
            >
              Курсы
            </Button>
          </Col>
        </Row>
        {user.isAuth ? (
          <Nav className="ml-auto" style={{ color: "white" }}>
            {user.user.role == "ADMIN" ? (
              <Button
                variant={"outline-light"}
                onClick={() => history.push(ADMIN_ROUTE)}
              >
                Админ панель
              </Button>
            ) : (
              <></>
            )}

            <Button variant={"outline-light"} onClick={logOut} className="ms-2">
              Выйти
            </Button>
          </Nav>
        ) : (
          <Nav className="ml-auto" style={{ color: "white" }}>
            <Button
              variant={"outline-light"}
              onClick={() => history.push(LOGIN_ROUTE)}
            >
              Авторизация
            </Button>
          </Nav>
        )}
      </Container>
    </Navbar>
  );
});

export default NavBar;
