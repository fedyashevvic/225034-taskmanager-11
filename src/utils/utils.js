import {RenderPosition} from "./const.js";

const castTimeFormat = (value) => {
  return value < 10 ? `0${value}` : String(value);
};

const formatTime = (date) => {
  const hours = castTimeFormat(date.getHours() % 12);
  const minutes = castTimeFormat(date.getMinutes());

  return `${hours}:${minutes}`;
};

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

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

const Key = {
  ESC: `Escape`,
};
const getTasksByFilter = (tasks) => {
  return tasks;
};

export {formatTime, createElement, render, Key, getTasksByFilter};
