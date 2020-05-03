import {render, replace} from "../utils/render.js";
import {Key} from "../utils/utils.js";
import Task from "../components/task-template.js";
import TaskEdit from "../components/create-task-template.js";

const Mode = {
  default: `default`,
  edit: `edit`,
};
export default class TaskController {
  constructor(container, onDataChange, onViewChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._onViewChange = onViewChange;
    this._mode = Mode.default;
    this._taskComponent = null;
    this._taskEditComponent = null;
  }
  renderTask(task) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new Task(task);
    this._taskEditComponent = new TaskEdit(task);

    this._taskComponent.addArchiveClick(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });
    this._taskComponent.addFavoriteClick(() => {
      this._onDataChange(this, task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });

    this._taskComponent.addClickEditButton(() => {
      this._taskToEditHandler();
    });
    this._taskEditComponent.addClickEditButton(() => {
      this._editToTaskHandler();
    });

    if (oldTaskEditComponent && oldTaskComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskEditComponent);
    } else {
      render(this._container, this._taskComponent);
    }
  }
  setDefaultView() {
    if (this._mode === Mode.edit) {
      this._editToTaskHandler();
      this._mode = Mode.default;
    }
  }

  _editToTaskHandler() {
    const parentElement = this._taskEditComponent.getElement().parentElement;
    const newElement = this._taskComponent.getElement();
    const oldElement = this._taskEditComponent.getElement();

    const isExistElements = !!(parentElement && newElement && oldElement);

    if (isExistElements && parentElement.contains(oldElement)) {
      parentElement.replaceChild(newElement, oldElement);
    }
  }

  _taskToEditHandler() {
    this._onViewChange();
    replace(this._taskEditComponent, this._taskComponent);
    this._mode = Mode.edit;
    const closeOnEsc = (evt) => {
      if (evt.key === Key.ESC) {
        this._editToTaskHandler();
        window.removeEventListener(`keydown`, closeOnEsc);
      }
    };
    window.addEventListener(`keydown`, closeOnEsc);
  }
}
