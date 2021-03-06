import Board from "./components/board-template.js";
import Header from "./components/header-template.js";
import Sort from "./components/sort-template.js";
import Filter from "./components/filters-template.js";
import TaskBoard from "./components/board-tasks-template.js";
import Task from "./components/task-template.js";
import TaskEdit from "./components/create-task-template.js";
import MoreButton from "./components/load-more-template.js";
import NoTask from "./components/no-task-template.js";
import {temprData} from "./components/temprData.js";
import {render, Key} from "./components/utils.js";

const NUMBER_ON_START_TASKS = 8;
const NUMBER_OF_NEXT_TASKS = 8;
let shownTasks = NUMBER_ON_START_TASKS;


const renderTask = (taskListElement, task) => {
  const taskComponent = new Task(task);
  const taskEditComponent = new TaskEdit(task);
  const editButton = taskComponent.getElement().querySelector(`.card__btn--edit`);
  const saveEditButton = taskEditComponent.getElement().querySelector(`button.card__save`);

  render(taskListElement, taskComponent.getElement());

  const taskToEditHandler = () => {
    taskListElement.replaceChild(taskEditComponent.getElement(), taskComponent.getElement());
    const closeOnEsc = (evt) => {
      if (evt.key === Key.ESC) {
        editToTaskHandler();
        window.removeEventListener(`keydown`, closeOnEsc);
      }
    };
    window.addEventListener(`keydown`, closeOnEsc);
  };
  const editToTaskHandler = () => {
    taskListElement.replaceChild(taskComponent.getElement(), taskEditComponent.getElement());
  };

  editButton.addEventListener(`click`, taskToEditHandler);
  saveEditButton.addEventListener(`click`, editToTaskHandler);
};

const renderBoard = (boardComponent, tasks) => {
  const boardElement = boardComponent.getElement();

  render(siteMainElement, boardElement);

  if (!tasks.length) {
    render(boardElement, new NoTask().getElement());
  } else {
    render(boardElement, new Sort().getElement());
    render(boardElement, new TaskBoard().getElement());

    const taskListElement = boardElement.querySelector(`.board__tasks`);
    tasks.slice(0, NUMBER_ON_START_TASKS)
      .forEach((task) => renderTask(taskListElement, task));

    const loadMoreButton = new MoreButton();

    render(boardElement, loadMoreButton.getElement());
    loadMoreButton.getElement().addEventListener(`click`, () => {
      let lastShownTasks = shownTasks;
      shownTasks = shownTasks + NUMBER_OF_NEXT_TASKS;

      temprData.slice(lastShownTasks, shownTasks)
        .forEach((task) => renderTask(taskListElement, task));

      if (shownTasks >= temprData.length) {
        loadMoreButton.getElement().remove();
        loadMoreButton.removeElement();
      }
    });
  }
};

const siteMainElement = document.querySelector(`.main`);
const siteMenuElement = siteMainElement.querySelector(`.main__control`);

render(siteMenuElement, new Header().getElement());
render(siteMainElement, new Filter().getElement());

const siteBoardElement = new Board();

renderBoard(siteBoardElement, temprData);
