import {createElement} from "./utils.js";

const returnBoardTemplate = () => {
  return (
    `<section class="board container">
    </section>`
  );
};

export default class Board {
  constructor(task) {
    this._task = task;
    this._element = null;
  }
  getTemplate() {
    return returnBoardTemplate(this._task);
  }
  getElement() {
    if (!this._element) {
      return createElement(this.getTemplate());
    }
    return this._element;
  }
  removeElement() {
    this._element = null;
  }
}
