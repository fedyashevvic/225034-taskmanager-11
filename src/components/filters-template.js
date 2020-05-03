import AbstractComponent from "./abstract-component.js";

const FILTER_PREFIX = `filter__`;
const getFilterById = (id) => {
  return id.substring(FILTER_PREFIX.length);
};

const returnFiltersItem = (filter, isChecked) => {
  const {title, count} = filter;
  return (
    `<input
      type="radio"
      id="filter__${title.toLowerCase()}"
      class="filter__input visually-hidden"
      name="filter"
      ${isChecked ? `checked` : ``}
      ${count > 0 ? `` : `disabled`}
    />
    <label for="filter__${title.toLowerCase()}" class="filter__label">
      ${title} <span class="filter__${title.toLowerCase()}-count">${count}</span></label
    >`
  );
};
export const returnFiltersTemplate = (filters) => {
  const template = filters.map((it) => returnFiltersItem(it, it.checked)).join(`\n`);
  return (
    `<section class="main__filter filter container">
    ${template}
    </section>`
  );
};

export default class Filter extends AbstractComponent {
  constructor(filters) {
    super();

    this._filters = filters;
  }
  getTemplate() {
    return returnFiltersTemplate(this._filters);
  }
  setFilterChangeHandler(handler) {
    this.getElement().addEventListener(`change`, (evt) => {
      const targetId = getFilterById(evt.targer.id);
      handler(targetId);
    });
  }
}

