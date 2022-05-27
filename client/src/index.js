import React, { createContext } from "react";
import ReactDOM from "react-dom/client";
import UserStore from "./store/UserStore";

import App from "./App";
import CourseStore from "./store/CourseStore";
import TestStore from "./store/TestStore";
import TheoryStore from "./store/TheoryStore";

export const Context = createContext(null);
//console.log(process.env.REACT_APP_API_URL);

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Context.Provider
    value={{
      user: new UserStore(),
      course: new CourseStore(),
      test: new TestStore(),
      theory: new TheoryStore(),
    }}
  >
    <App />
  </Context.Provider>
);
