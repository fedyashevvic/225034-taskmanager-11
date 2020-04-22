import AbstractComponent from "./abstract-component.js";

const returnLoadMoreButtonTemplate = () => {
  return (
    `<button class="load-more" type="button">load more</button>`
  );
};

export default class MoreButton extends AbstractComponent {
  getTemplate() {
    return returnLoadMoreButtonTemplate();
  }
}
