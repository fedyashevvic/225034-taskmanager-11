import AbstractComponent from "./abstract-component.js";


const returnBoardTemplate = () => {
  return (
    `<section class="board container">
    </section>`
  );
};


export default class Board extends AbstractComponent {
  getTemplate() {
    return returnBoardTemplate();
  }
}

