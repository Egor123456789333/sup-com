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
  CHECK_ROUTE,
  ADD_TEST,
  DELETE_TEST,
  UPDATE_TESTS,
  UPDATE_TEST,
  ADD_COURSE,
  COURSE_LIST,
  UPDATE_COURSE,
  ADD_THEORY,
  THEORY_LIST,
  UPDATE_THEORY,
} from "./utils/const";
import Auth from "./pages/Auth";
import CoursePage from "./pages/CoursePage";
import CheckPage from "./pages/CheckPage";
import AddTest from "./pages/AddTest";
import DeleteTest from "./pages/DeleteTest";
import TestsUpdate from "./pages/TestsUpdate";
import OneTestUpdate from "./pages/OneTestUpdate";
import AddCourse from "./pages/AddCourse";
import CourseList from "./pages/CourseList";
import UpdateCourse from "./pages/UpdateCourse";
import AddTheory from "./pages/AddTheory";
import TheoryList from "./pages/TheoryList";
import UpdateTheory from "./pages/UpdateTheory";

export const adminRoutes = [
  {
    path: UPDATE_THEORY + "/:id",
    Component: UpdateTheory,
  },
  {
    path: THEORY_LIST,
    Component: TheoryList,
  },
  {
    path: ADD_THEORY,
    Component: AddTheory,
  },
  {
    path: UPDATE_TESTS,
    Component: TestsUpdate,
  },
  {
    path: UPDATE_TEST + "/:id",
    Component: OneTestUpdate,
  },
  {
    path: ADD_TEST,
    Component: AddTest,
  },
  {
    path: DELETE_TEST,
    Component: DeleteTest,
  },
  {
    path: ADMIN_ROUTE,
    Component: Admin,
  },
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },
  {
    path: ADD_COURSE,
    Component: AddCourse,
  },
  { path: COURSE_LIST, Component: CourseList },
  { path: UPDATE_COURSE + "/:id", Component: UpdateCourse },
];

export const authRoutes = [
  {
    path: BASKET_ROUTE,
    Component: Basket,
  },

  { path: COURSE_LIST, Component: CourseList },
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
    path: COURSE_ROUTE,
    Component: CoursePage,
  },
  {
    path: TEST_ROUTE + "/:id",
    Component: TestPage,
  },
  {
    path: THEORY_ROUTE + "/:id",
    Component: Theory,
  },
  {
    path: CHECK_ROUTE,
    Component: CheckPage,
  },
];
