import {createElement} from "./utils.js";

const filters = {
  titles: [`All`, `Overdue`, `Today`, `Favorites`, `Repeating`, `Archive`],
  returnCount: () => {
    return Math.floor(Math.random() * Math.floor(10));
  }
};

const returnFiltersItem = (title, count) => {
  return (
    `<input
      type="radio"
      id="filter__${title.toLowerCase()}"
      class="filter__input visually-hidden"
      name="filter"
      ${title === `All` ? `checked` : ``}
      ${count > 0 ? `` : `disabled`}
    />
    <label for="filter__${title.toLowerCase()}" class="filter__label">
      ${title} <span class="filter__${title.toLowerCase()}-count">${count}</span></label
    >`
  );
};
const renderFilterItems = () => {
  let currentTemplate = ``;
  for (const title of filters.titles) {
    currentTemplate += returnFiltersItem(title, filters.returnCount());
  }
  return currentTemplate;
};
export const returnFiltersTemplate = () => {
  const template = renderFilterItems();
  return (
    `<section class="main__filter filter container">
    ${template}
    </section>`
  );
};

export default class Filter {
  constructor() {
    this._element = null;
  }
  getTemplate() {
    return returnFiltersTemplate();
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

