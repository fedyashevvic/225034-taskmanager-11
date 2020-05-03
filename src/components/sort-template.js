import AbstractComponent from "./abstract-component.js";
import {SortType} from "../utils/const.js";

const returnSortTemplate = () => {
  return (
    `<div class="board__filter-list">
        <a href="#" class="board__filter" data-sort-type="${SortType.DEFAULT}">SORT BY DEFAULT</a>
        <a href="#" class="board__filter" data-sort-type="${SortType.DATEUP}">SORT BY DATE up</a>
        <a href="#" class="board__filter" data-sort-type="${SortType.DATEDOWN}">SORT BY DATE down</a>
      </div>

      <div class="board__tasks"></div>`
  );
};

export default class Sort extends AbstractComponent {
  constructor() {
    super();
    this._sortType = SortType.DEFAULT;
  }
  getTemplate() {
    return returnSortTemplate();
  }
  getSortType() {
    return this._sortType;
  }
  setSortTypeHandler(handler) {
    this.getElement().addEventListener(`click`, (evt) => {
      evt.preventDefault();
      const target = evt.target;
      const currentSortType = target.dataset.sortType;

      if (target.tagName !== `A`) {
        return;
      }
      if (currentSortType === this._sortType) {
        return;
      }
      this._sortType = currentSortType;
      handler(this._sortType);
    });
  }
}
