import React, { useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { authRoutes, publicRoutes } from "../Routes";
import { COURSE_ROUTE } from "../utils/const";
import { Context } from "../index";

const AppRouter = () => {
  const { user } = useContext(Context);
  console.log(user);
  return (
    <Switch>
      {user.isAuth &&
        authRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            component={(props) => <Component {...props} />}
            exact
          />
        ))}
      {publicRoutes.map(({ path, Component }) => (
        <Route
          key={path}
          path={path}
          component={(props) => <Component {...props} />}
          exact
        />
      ))}
      <Redirect to={COURSE_ROUTE} />
    </Switch>
  );
};

export default AppRouter;
