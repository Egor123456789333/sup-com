import { makeAutoObservable } from "mobx";

export default class CourseStore {
  constructor() {
    this._courses = [];
    this._author = [
      { id: 1, name: "<E<E<" },
      { id: 2, name: "<E<E<" },
    ];
    this._types = [];

    this._selectedType = {};

    this._basket = [];

    makeAutoObservable(this);
  }
  setCourses(courses) {
    this._courses = courses;
  }

  setAuthor(author) {
    this._author = author;
  }

  setTypes(types) {
    this._types = types;
  }

  setBasket(basket) {
    this._basket = basket;
  }

  get courses() {
    return this._courses;
  }
  get authors() {
    return this._author;
  }
  get types() {
    return this._types;
  }
  get selectedType() {
    return this._selectedType;
  }

  get basket() {
    return this._basket;
  }
}
