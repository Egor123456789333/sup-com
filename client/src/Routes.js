import { Component } from "react";
import Admin from "./pages/Admin";
import Basket from "./pages/Basket";
import MainPage from "./pages/MainPage";
import Theory from "./pages/Theory";

import TestingPage from "./pages/TestingPage";
import TestPage from "./pages/TestPage";
import {
  ADMIN_ROUTE,
  BASKET_ROUTE,
  MAIN_ROUTE,
  LOGIN_ROUTE,
  REGISTRATION_ROUTE,
  COURSE_ROUTE,
  THEORY_ROUTE,
  TESTING_ROUTE,
  TEST_ROUTE,
} from "./utils/const";
import Auth from "./pages/Auth";
import CoursePage from "./pages/CoursePage";

export const authRoutes = [
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
];

export const publicRoutes = [
  {
    path: MAIN_ROUTE,
    Component: MainPage,
  },
  {
    path: LOGIN_ROUTE,
    Component: Auth,
  },

  {
    path: TESTING_ROUTE,
    Component: TestingPage,
  },

  {
    path: REGISTRATION_ROUTE,
    Component: Auth,
  },
  {
    path: COURSE_ROUTE + "/:id",
    Component: CoursePage,
  },
  {
    path: TEST_ROUTE + "/:id",
    Component: TestPage,
  },
  {
    path: THEORY_ROUTE,
    Component: Theory,
  },
];
