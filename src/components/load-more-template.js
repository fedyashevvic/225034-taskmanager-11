import {createElement} from "./utils.js";

const returnLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class MoreButton {
  constructor(task) {
    this._task = task;
    this._element = null;
  }
  getTemplate() {
    return returnLoadMoreButtonTemplate(this._task);
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
