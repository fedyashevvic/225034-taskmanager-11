import AbstractComponent from "./abstract-component.js";

const returnNoTaskTemplate = () => {
  return (
    `<section class="board container">
      <p class="board__no-tasks">
        Click «ADD NEW TASK» in menu to create your first task
      </p>
    </section>`
  );
};

export default class NoTask extends AbstractComponent {
  getTemplate() {
    return returnNoTaskTemplate();
  }
}
