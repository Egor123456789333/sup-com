import { makeAutoObservable } from "mobx";

export default class TestStore {
  constructor() {
    this._tests = [];
    this._oneTest = [];
    this._questionAnswer = [];

    makeAutoObservable(this);
  }
  setTests(tests) {
    this._tests = tests;
  }

  setOneTest(oneTest) {
    this._oneTest = oneTest;
  }

  get tests() {
    return this._tests;
  }

  get oneTest() {
    return this._oneTest;
  }
}
