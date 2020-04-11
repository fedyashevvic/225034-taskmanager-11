import {returnHeaderTemplate} from "./components/header-template.js";
import {returnSortTemplate} from "./components/sort-template.js";
import {returnFiltersTemplate} from "./components/filters-template.js";
import {returnTaskTemplate} from "./components/task-template.js";
import {returnCreateTaskTemplate} from "./components/create-task-template.js";
import {returnLoadMoreButtonTemplate} from "./components/load-more-template.js";
import {temprData} from "./components/temprData.js";

const NUMBER_ON_START_TASKS = 9;
const NUMBER_OF_NEXT_TASKS = 8;
let shownTasks = NUMBER_ON_START_TASKS;


const render = (container, template, place = `beforeend`) => {
  container.insertAdjacentHTML(place, template);
};

const siteMainElement = document.querySelector(`.main`);
const siteMenuElement = siteMainElement.querySelector(`.main__control`);

render(siteMenuElement, returnHeaderTemplate());
render(siteMainElement, returnFiltersTemplate());
render(siteMainElement, returnSortTemplate());

const siteBoardElement = siteMainElement.querySelector(`.board`);
const siteBoardTasksElement = siteBoardElement.querySelector(`.board__tasks`);

render(siteBoardTasksElement, returnCreateTaskTemplate(temprData[0]));

temprData.slice(1, NUMBER_ON_START_TASKS)
  .forEach((task) => render(siteBoardTasksElement, returnTaskTemplate(task)));

render(siteBoardElement, returnLoadMoreButtonTemplate());
const loadMoreButton = siteBoardElement.querySelector(`.load-more`);

loadMoreButton.addEventListener(`click`, () => {
  let lastShownTasks = shownTasks;
  shownTasks = shownTasks + NUMBER_OF_NEXT_TASKS;

  temprData.slice(lastShownTasks, shownTasks)
    .forEach((task) => render(siteBoardTasksElement, returnTaskTemplate(task)));

  if (shownTasks >= temprData.length) {
    loadMoreButton.remove();
  }
});
