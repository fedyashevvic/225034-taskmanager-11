import {Key} from "../components/utils.js";
import {render, replace} from "../components/render.js";
import Task from "../components/task-template.js";
import TaskEdit from "../components/create-task-template.js";

export default class TaskController {
  constructor(container, onDataChange) {
    this._container = container;
    this._onDataChange = onDataChange;
    this._taskComponent = null;
    this._taskEditComponent = null;
  }
  renderTask(task) {
    const oldTaskComponent = this._taskComponent;
    const oldTaskEditComponent = this._taskEditComponent;

    this._taskComponent = new Task(task);
    this._taskEditComponent = new TaskEdit(task);


    const taskToEditHandler = () => {
      replace(this._taskEditComponent, this._taskComponent);
      const closeOnEsc = (evt) => {
        if (evt.key === Key.ESC) {
          editToTaskHandler();
          window.removeEventListener(`keydown`, closeOnEsc);
        }
      };
      window.addEventListener(`keydown`, closeOnEsc);
    };

    this._taskComponent.addArchiveClick(() => {
      this._onDataChange(task, Object.assign({}, task, {
        isArchive: !task.isArchive,
      }));
    });
    this._taskComponent.addFavoriteClick(() => {
      this._onDataChange(task, Object.assign({}, task, {
        isFavorite: !task.isFavorite,
      }));
    });
    const editToTaskHandler = () => {
      replace(this._taskComponent, this._taskEditComponent);
    };

    this._taskComponent.addClickEditButton(taskToEditHandler);
    this._taskEditComponent.addClickEditButton(editToTaskHandler);

    if (oldTaskEditComponent && oldTaskComponent) {
      replace(this._taskComponent, oldTaskComponent);
      replace(this._taskEditComponent, oldTaskEditComponent);
    } else {
      render(this._container, this._taskComponent);
    }
  }
}
