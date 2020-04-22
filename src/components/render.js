import {RenderPosition} from "./const.js";

const render = (container, component, place = RenderPosition.BEFOREEND) => {
  const element = component.getElement();
  const {AFTERBEGIN, BEFOREEND} = RenderPosition;

  switch (place) {
    case AFTERBEGIN:
      container.prepend(element);
      break;
    case BEFOREEND:
      container.append(element);
      break;
  }
};

const replace = (container, elementToRemove, elementToAdd) => {
  container.replaceChild(elementToRemove.getElement(), elementToAdd.getElement());
};

export {render, replace};
