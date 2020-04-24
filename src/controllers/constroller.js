import Header from "../components/header-template.js";
import Sort from "../components/sort-template.js";
import Filter from "../components/filters-template.js";
import TaskBoard from "../components/board-tasks-template.js";
import Task from "../components/task-template.js";
import TaskEdit from "../components/create-task-template.js";
import MoreButton from "../components/load-more-template.js";
import NoTask from "../components/no-task-template.js";
import {temprData} from "../components/temprData.js";
import {Key} from "../components/utils.js";
import {render, replace} from "../components/render.js";
import {SortType} from "../components/const.js";


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
  }
  render() {
    const NUMBER_ON_START_TASKS = 8;
    const NUMBER_OF_NEXT_TASKS = 8;
    let shownTasks = NUMBER_ON_START_TASKS;


    const renderTask = (taskListElement, task) => {
      const taskComponent = new Task(task);
      const taskEditComponent = new TaskEdit(task);

      render(taskListElement, taskComponent);

      const taskToEditHandler = () => {
        replace(taskListElement, taskEditComponent, taskComponent);
        const closeOnEsc = (evt) => {
          if (evt.key === Key.ESC) {
            editToTaskHandler();
            window.removeEventListener(`keydown`, closeOnEsc);
          }
        };
        window.addEventListener(`keydown`, closeOnEsc);
      };
      const editToTaskHandler = () => {
        replace(taskListElement, taskComponent, taskEditComponent);

      };

      taskComponent.addClickEvtToSelector(taskToEditHandler, `card__btn--edit`);
      taskEditComponent.addClickEvtToSelector(editToTaskHandler, `card__save`);
    };

    const renderBoard = (boardComponent, tasks) => {
      const boardElement = boardComponent.getElement();

      const renderLoadMoreButton = (taskListElement) => {
        render(boardElement, this._loadMoreBotton);
        this._loadMoreBotton.addClickEvt(() => {
          let lastShownTasks = shownTasks;
          shownTasks = shownTasks + NUMBER_OF_NEXT_TASKS;

          const sortedTasks = getSortedTasks(tasks, this._sort.getSortType());
          sortedTasks.slice(lastShownTasks, shownTasks)
            .forEach((task) => renderTask(taskListElement, task));

          if (shownTasks >= temprData.length) {
            this._loadMoreBotton.removeElement();
          }
        });
      };

      render(siteMainElement, boardComponent);

      if (!tasks.length) {
        render(boardElement, this._noTask);
      } else {
        render(boardElement, this._sort);
        render(boardElement, this._taskBoard);

        const taskListElement = boardElement.querySelector(`.board__tasks`);

        temprData.slice(0, NUMBER_ON_START_TASKS)
          .forEach((task) => renderTask(taskListElement, task));

        renderLoadMoreButton(taskListElement);

        this._sort.setSortTypeHandler((sortType) => {
          shownTasks = NUMBER_ON_START_TASKS;
          taskListElement.innerHTML = ``;

          const sortedTasks = getSortedTasks(tasks, sortType);
          sortedTasks.slice(0, NUMBER_ON_START_TASKS)
            .forEach((task) => renderTask(taskListElement, task));

          renderLoadMoreButton(taskListElement);
        });
      }
    };

    const siteMainElement = document.querySelector(`.main`);
    const siteMenuElement = siteMainElement.querySelector(`.main__control`);

    render(siteMenuElement, this._header);
    render(siteMainElement, this._filter);

    renderBoard(this._container, temprData);


  }
}
