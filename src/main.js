import {returnHeaderTemplate} from "./components/header-template.js";
import {returnSortTemplate} from "./components/sort-template.js";
import {returnFiltersTemplate} from "./components/filters-template.js";
import {returnTaskTemplate} from "./components/task-template.js";
import {returnCreateTaskTemplate} from "./components/create-task-template.js";
import {returnLoadMoreButtonTemplate} from "./components/load-more-template.js";

const NUMBER_OF_RENDERED_TASKS = 3;

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

render(siteBoardTasksElement, returnCreateTaskTemplate());
for (let i = 0; i < NUMBER_OF_RENDERED_TASKS; i++) {
  render(siteBoardTasksElement, returnTaskTemplate());
}
render(siteBoardElement, returnLoadMoreButtonTemplate());
