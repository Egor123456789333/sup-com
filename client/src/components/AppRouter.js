import React, { useContext } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import { adminRoutes, authRoutes, publicRoutes } from "../Routes";
import { COURSE_ROUTE } from "../utils/const";
import { Context } from "../index";
import { observer } from "mobx-react-lite";

const AppRouter = observer(() => {
  const { user } = useContext(Context);
  console.log(user);
  return (
    <Switch>
      {user.isAuth &&
        user.user.role == "ADMIN" &&
        adminRoutes.map(({ path, Component }) => (
          <Route
            key={path}
            path={path}
            component={(props) => <Component {...props} />}
            exact
          />
        ))}
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
});

export default AppRouter;
