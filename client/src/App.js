import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Spinner } from "react-bootstrap";
import { BrowserRouter } from "react-router-dom";
import { Context } from ".";
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import { fetchTheory } from "./http/theoryApi";
import { check } from "./http/userApi";

const App = observer(() => {
  const { user, theory } = useContext(Context);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchTheory().then((data) => {
      console.log(data);
      theory.setChapters(data);
    });
    check()
      .then((data) => {
        console.log(data);
        user.setUser(data);
        user.setIsAuth(true);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Spinner animation={"grom"} />;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <AppRouter />
    </BrowserRouter>
  );
});

export default App;
