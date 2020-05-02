import {FilterType} from "../components/const.js";
import FilterComponent from "../components/filters-template.js";
import {getTasksByFilter} from "../components/utils.js";
import {render, replace} from "../components/render.js";

export default class FilterController {
  constructor(container, dataModel) {
    this._container = container;
    this._dataModel = dataModel;

    this._filterType = FilterType.ALL;
    this._filterComponent = null;

    this._onFilterChange = this._onFilterChange.bind(this);
  }
  render() {
    const container = this._container;
    const allTasks = this._dataModel.getTasks();
    const filters = Object.values(FilterType).map((filter) => {
      return {
        name: filter,
        count: getTasksByFilter(allTasks, filter).length,
        isChecked: filter === this._filterType,
      };
    });
    const oldComponent = this._filterComponent;
    this._filterComponent = new FilterComponent(filters);
    this._filterComponent.setFilterChangeHandler(this._onFilterChange);

    if (oldComponent) {
      replace(this._filterComponent, oldComponent);
    } else {
      render(container, this._filterComponent);
    }
  }
  _onFilterChange(filterType) {
    this._dataModel.setFilter(filterType);
    this._filterType = filterType;
  }
  _onDataChange() {
    this.render();
  }
}
