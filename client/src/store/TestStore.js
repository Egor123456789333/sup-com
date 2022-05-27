import { makeAutoObservable } from "mobx";

export default class TestStore {
  constructor() {
    this._tests = [];
    this._oneTest = [];
    this._answer = [];

    makeAutoObservable(this);
  }
  setTests(tests) {
    this._tests = tests;
  }

  setOneTest(oneTest) {
    this._oneTest = oneTest;
  }

  setAnswer(answer) {
    this._answer = answer;
  }

  get tests() {
    return this._tests;
  }

  get oneTest() {
    return this._oneTest;
  }

  get answer() {
    return this._answer;
  }
}
