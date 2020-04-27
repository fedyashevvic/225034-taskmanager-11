import {MONTH_NAMES, WEEK_DAYS, TEMPLATE_COLORS} from "./const.js";
import {formatTime} from "./utils.js";
import AbstractSmartComponent from "./smart-abstract-component.js";

const returnWeekdaysTemplate = (day, isRepeat) => {
  return (
    `<input
      class="visually-hidden card__repeat-day-input"
      type="checkbox"
      id="repeat-${day}-4"
      name="repeat"
      value="${day}"
      ${isRepeat ? `checked` : ``}
    />
    <label class="card__repeat-day" for="repeat-${day}-4"
      >${day}</label
    >`
  );
};
const renderWeekdaysTemplate = (isRepeat) => {
  let currentTemplate = ``;
  if (!isRepeat) {
    return currentTemplate;
  }
  for (const day of WEEK_DAYS) {
    const activeDay = Math.random() > 0.5;
    currentTemplate += returnWeekdaysTemplate(day, activeDay);
  }
  return currentTemplate;
};

const returnColorsTemplate = (color, activeColor) => {
  return (
    `<input
      type="radio"
      id="color-${color}-4"
      class="card__color-input card__color-input--${color} visually-hidden"
      name="color"
      value="${color}"
      ${activeColor ? `checked` : ``}
    />
    <label
      for="color-${color}-4"
      class="card__color card__color--${color}"
      >${color}</label
    >`
  );
};
const renderColorsTemplate = (currentColor) => {
  let currentTemplate = ``;
  for (const color of TEMPLATE_COLORS) {
    currentTemplate += returnColorsTemplate(color, color === currentColor);
  }
  return currentTemplate;
};

const returnCreateTaskTemplate = (task) => {
  const {description, dueDate, color, isRepeat} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;
  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? formatTime(dueDate) : ``;
  const repeatLineClass = isRepeat ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;
  const colorTemplate = renderColorsTemplate(color);
  const weekdaysTemplate = renderWeekdaysTemplate(isRepeat);
  const isSaveBlocked = (isDateShowing && isRepeat);


  return (
    `<article class="card card--edit card--${color} ${repeatLineClass} ${deadlineClass}">
      <form class="card__form" method="get">
        <div class="card__inner">
          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <label>
              <textarea
                class="card__text"
                placeholder="Start typing your text here..."
                name="text"
              >${description}</textarea>
            </label>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <button class="card__date-deadline-toggle" type="button">
                  date: <span class="card__date-status">${isDateShowing ? `yes` : `no`}</span>
                </button>
                ${isDateShowing ?
      `<fieldset class="card__date-deadline">
                  <label class="card__input-deadline-wrap">
                    <input
                      class="card__date"
                      type="text"
                      placeholder=""
                      name="date"
                      value="${date} ${time}"
                    />
                  </label>
                </fieldset>`
      : ``}

                <button class="card__repeat-toggle" type="button">
                  repeat:<span class="card__repeat-status">${isRepeat ? `yes` : `no`}</span>
                </button>

                <fieldset class="card__repeat-days">
                  <div class="card__repeat-days-inner">
                    ${weekdaysTemplate}
                  </div>
                </fieldset>
              </div>
            </div>

            <div class="card__colors-inner">
              <h3 class="card__colors-title">Color</h3>
              <div class="card__colors-wrap">
                ${colorTemplate}
              </div>
            </div>
          </div>

          <div class="card__status-btns">
            <button class="card__save" type="submit" ${isSaveBlocked ? `disabled` : ``}>save</button>
            <button class="card__delete" type="button">delete</button>
          </div>
        </div>
      </form>
    </article>`
  );
};

export default class TaskEdit extends AbstractSmartComponent {
  constructor(task) {
    super();
    this._task = task;

    this._submitHandler = null;
    this._isRepeatingTask = null;

    this._subscribeOnEvents();
  }
  getTemplate() {
    return returnCreateTaskTemplate(this._task);
  }
  addClickEditButton(cb) {
    this.getElement().querySelector(`form`).addEventListener(`submit`, cb);
    this._submitHandler = cb;
  }
  recoveryListeners() {
    this.addClickEditButton(this._submitHandler);
    this._subscribeOnEvents();
  }
  rerender() {
    super.rerender();
  }
  _subscribeOnEvents() {
    const element = this.getElement();

    element.querySelector(`.card__date-deadline-toggle`)
      .addEventListener(`click`, () => {
        this._isDateShowing = !this._isDateShowing;

        this.rerender();
      });

    element.querySelector(`.card__repeat-toggle`)
      .addEventListener(`click`, () => {
        this._isRepeatingTask = !this._isRepeatingTask;

        this.rerender();
      });

    const repeatDays = element.querySelector(`.card__repeat-days`);
    if (repeatDays) {
      repeatDays.addEventListener(`change`, (evt) => {
        this._activeRepeatingDays[evt.target.value] = evt.target.checked;

        this.rerender();
      });
    }
  }
}
