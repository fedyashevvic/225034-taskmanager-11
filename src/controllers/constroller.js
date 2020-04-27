import Header from "../components/header-template.js";
import Sort from "../components/sort-template.js";
import Filter from "../components/filters-template.js";
import TaskBoard from "../components/board-tasks-template.js";
import MoreButton from "../components/load-more-template.js";
import NoTask from "../components/no-task-template.js";
import {temprData} from "../components/temprData.js";
import {render} from "../components/render.js";
import {SortType} from "../components/const.js";
import TaskController from "./task-controller.js";


const getSortedTasks = (tasks, sortType) => {
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
};

export default class ControllerComponent {
  constructor(container) {
    this._container = container;

    this._noTask = new NoTask();
    this._sort = new Sort();
    this._filter = new Filter();
    this._header = new Header();
    this._loadMoreBotton = new MoreButton();
    this._taskBoard = new TaskBoard();
    this._taskController = new TaskController();
    this._NUMBER_ON_START_TASKS = 8;
    this._NUMBER_OF_NEXT_TASKS = 8;
    this._shownTasks = this._NUMBER_ON_START_TASKS;
    this._siteMainElement = document.querySelector(`.main`);
    this._siteMenuElement = this._siteMainElement.querySelector(`.main__control`);
  }
  renderApp() {
    render(this._siteMenuElement, this._header);
    render(this._siteMainElement, this._filter);

    this.renderBoard(this._container, temprData);
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

      temprData.slice(0, this._NUMBER_ON_START_TASKS)
        .forEach((task) => this._taskController.renderTask(taskListElement, task));

      this.renderLoadMoreButton(boardElement, tasks, taskListElement);

      this._sort.setSortTypeHandler((sortType) => {
        this._shownTasks = this._NUMBER_ON_START_TASKS;
        taskListElement.innerHTML = ``;

        const sortedTasks = getSortedTasks(tasks, sortType);
        sortedTasks.slice(0, this._NUMBER_ON_START_TASKS)
          .forEach((task) => this._taskController.renderTask(taskListElement, task));

        this.renderLoadMoreButton(boardElement, tasks, taskListElement);
      });
    }
  }

  renderLoadMoreButton(boardElement, tasks, taskListElement) {
    render(boardElement, this._loadMoreBotton);
    this._loadMoreBotton.addClickEvt(() => {
      let lastShownTasks = this._shownTasks;
      this._shownTasks = this._shownTasks + this._NUMBER_OF_NEXT_TASKS;

      const sortedTasks = getSortedTasks(tasks, this._sort.getSortType());
      sortedTasks.slice(lastShownTasks, this._shownTasks)
        .forEach((task) => this._taskController.renderTask(taskListElement, task));

      if (this._shownTasks >= temprData.length) {
        this._loadMoreBotton.removeElement();
      }
    });
  }
}
