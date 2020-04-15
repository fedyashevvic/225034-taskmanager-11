import {createElement} from "./utils.js";

const returnTasksBoardTemplate = () => {
  return (
    `<div class="board__tasks"></div>`
  );
};

export default class TaskBoard {
  constructor(task) {
    this._task = task;
    this._element = null;
  }
  getTemplate() {
    return returnTasksBoardTemplate(this._task);
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
