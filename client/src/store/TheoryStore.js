import { makeAutoObservable } from "mobx";

export default class TheoryStore {
  constructor() {
    this._chapter = [];

    this._selectedChap = {};

    this._chapters = [];

    makeAutoObservable(this);
  }
  setChapter(chapter) {
    this._chapter = chapter;
  }

  setSelectedChap(num) {
    this._selectedChap = num;
  }

  setChapters(theory) {
    this._chapters = theory;
  }

  get chapter() {
    return this._chapter;
  }
  get selectedChap() {
    return this._selectedChap;
  }

  get chapters() {
    return this._chapters;
  }
}
