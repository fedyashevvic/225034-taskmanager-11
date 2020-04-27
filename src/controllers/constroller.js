import Header from "../components/header-template.js";
import Sort from "../components/sort-template.js";
import Filter from "../components/filters-template.js";
import TaskBoard from "../components/board-tasks-template.js";
import MoreButton from "../components/load-more-template.js";
import NoTask from "../components/no-task-template.js";
import {render} from "../components/render.js";
import {SortType} from "../components/const.js";
import TaskController from "./task-controller.js";


const renderTasks = (taskListElement, tasks, onDataChange) => {
  return tasks.map((task) => {
    const taskController = new TaskController(taskListElement, onDataChange);
    taskController.renderTask(task);
    return taskController;
  });
};

export default class ControllerComponent {
  constructor(container) {
    this._container = container;

    this._tasks = [];
    this._showedTaskControllers = [];
    this._NUMBER_ON_START_TASKS = 8;
    this._NUMBER_OF_NEXT_TASKS = 8;
    this._shownTasks = this._NUMBER_ON_START_TASKS;
    this._siteMainElement = document.querySelector(`.main`);
    this._siteMenuElement = this._siteMainElement.querySelector(`.main__control`);

    this._noTask = new NoTask();
    this._sort = new Sort();
    this._filter = new Filter();
    this._header = new Header();
    this._loadMoreBotton = new MoreButton();
    this._taskBoard = new TaskBoard();

    this._onDataChange = this._onDataChange.bind(this);
    this._onSortTypeChange = this._onSortTypeChange.bind(this);

  }
  renderApp(tasks) {
    this._tasks = tasks;

    render(this._siteMenuElement, this._header);
    render(this._siteMainElement, this._filter);

    this.renderBoard(this._container, this._tasks);
  }


  renderBoard(boardComponent, tasks) {
    const boardElement = boardComponent.getElement();

    render(this._siteMainElement, boardComponent);

    if (!tasks.length) {
      render(boardElement, this._noTask);
    } else {
      render(boardElement, this._sort);
      render(boardElement, this._taskBoard);

      const taskListElement = boardElement.querySelector(`.board__tasks`);

      const newTasks = renderTasks(taskListElement, tasks.slice(0, this._shownTasks), this._onDataChange);
      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      this.renderLoadMoreButton(tasks, taskListElement);

      this._sort.setSortTypeHandler((sortType) => {
        this._onSortTypeChange(sortType, taskListElement);
      });
    }
  }

  _onSortTypeChange(sortType, taskListElement) {
    this._shownTasks = this._NUMBER_ON_START_TASKS;
    taskListElement.innerHTML = ``;
    const sortedTasks = this.getSortedTasks(this._tasks, sortType);
    const newTasks = renderTasks(taskListElement, sortedTasks.slice(0, this._shownTasks), this._onDataChange);
    this._showedTaskControllers = newTasks;

    this.renderLoadMoreButton(this._tasks, taskListElement);
  }

  renderLoadMoreButton(tasks, taskListElement) {
    this._loadMoreBotton.removeElement();
    const boardElement = this._container.getElement();
    render(boardElement, this._loadMoreBotton);

    this._loadMoreBotton.addClickEvt(() => {
      let lastShownTasks = this._shownTasks;
      this._shownTasks = this._shownTasks + this._NUMBER_OF_NEXT_TASKS;

      const sortedTasks = this.getSortedTasks(tasks, this._sort.getSortType());
      const newTasks = renderTasks(taskListElement, sortedTasks.slice(lastShownTasks, this._shownTasks), this._onDataChange);
      this._showedTaskControllers = this._showedTaskControllers.concat(newTasks);

      if (this._shownTasks >= tasks.length) {
        this._loadMoreBotton.removeElement();
      }
    });
  }
  _onDataChange(oldData, newData) {
    const index = this._tasks.findIndex((it) => it === oldData);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), newData, this._tasks.slice(index + 1));

    this._showedTaskControllers[index].renderTask(this._tasks[index]);
  }
  getSortedTasks(tasks, sortType) {
    let sortedTasks = [];
    const currentTasks = tasks.slice();

    switch (sortType) {
      case SortType.DATEUP:
        sortedTasks = currentTasks.sort((a, b) => a.dueDate - b.dueDate);
        break;
      case SortType.DATEDOWN:
        sortedTasks = currentTasks.sort((a, b) => b.dueDate - a.dueDate);
        break;
      case SortType.DEFAULT:
        sortedTasks = currentTasks;
        break;
    }
    return sortedTasks;
  }
}
