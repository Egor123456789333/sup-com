import React, { useContext } from "react";
import { Card, Container, Form, Button, Row } from "react-bootstrap";
import { useLocation, NavLink, useHistory } from "react-router-dom";
import { login, registration } from "../http/userApi";
import { LOGIN_ROUTE, MAIN_ROUTE, REGISTRATION_ROUTE } from "../utils/const";
import { useState } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "..";

const Auth = observer(() => {
  const { user } = useContext(Context);
  const location = useLocation();
  const history = useHistory();
  const isLogin = location.pathname === LOGIN_ROUTE;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  const click = async () => {
    try {
      let data;
      if (isLogin) {
        data = await login(email, password);
      } else {
        data = await registration(email, password, name, surname);
      }
      user.setUser(data);
      user.setIsAuth(true);

      history.push(MAIN_ROUTE);
    } catch (e) {
      alert(e.response.data.message);
    }
  };
  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ height: window.innerHeight - 54 }}
    >
      <Card style={{ width: 600 }} className="p-5">
        <h2 className="m-auto">{isLogin ? "Авторизация" : "Регистрация"}</h2>

        <Form className="d-flex flex-column">
          {isLogin ? (
            <div></div>
          ) : (
            <div>
              <Form.Control
                className="mt-3"
                placeholder="Введите имя"
                value={name}
                onChange={(e) => setName(e.target.value)}
              ></Form.Control>
              <Form.Control
                className="mt-3"
                placeholder="Введите фамилию"
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              ></Form.Control>
            </div>
          )}
          <Form.Control
            className="mt-3"
            placeholder="Введите email..."
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          ></Form.Control>
          <Form.Control
            className="mt-3 mb-4"
            placeholder="Введите пароль..."
            value={password}
            type="password"
            onChange={(e) => setPassword(e.target.value)}
          ></Form.Control>
          <Button variant={"outline-success"} onClick={click}>
            {isLogin ? "Войти" : "Регистрация"}
          </Button>
          <Row className="d-flex justify-content-between mt-3 pl-3 pr-3">
            {isLogin ? (
              <div>
                Нет аккаунта?{" "}
                <NavLink to={REGISTRATION_ROUTE}>Зарегистрируйтесь!</NavLink>
              </div>
            ) : (
              <div>
                Есть аккаунт? <NavLink to={LOGIN_ROUTE}>Войдите!</NavLink>
              </div>
            )}
          </Row>
        </Form>
      </Card>
    </Container>
  );
});

export default Auth;
