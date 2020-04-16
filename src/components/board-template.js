import {createElement} from "./utils.js";

const returnBoardTemplate = () => {
  return (
    `<section class="board container">
    </section>`
  );
};

export default class Board {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return returnBoardTemplate();
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
