import {MONTH_NAMES} from "../utils/const.js";
import {formatTime} from "../utils/utils.js";
import AbstractComponent from "./abstract-component.js";

const returnTaskTemplate = (task, isRepeatingTask) => {
  const {description, dueDate, color, isFavorite, isArchive} = task;

  const isExpired = dueDate instanceof Date && dueDate < Date.now();
  const isDateShowing = !!dueDate;

  const date = isDateShowing ? `${dueDate.getDate()} ${MONTH_NAMES[dueDate.getMonth()]}` : ``;
  const time = isDateShowing ? `${formatTime(dueDate)}` : ``;

  const favoriteButtonClass = isFavorite ? `` : `card__btn--disabled`;
  const archiveButtonClass = isArchive ? `` : `card__btn--disabled`;
  const repeatLineClass = isRepeatingTask ? `card--repeat` : ``;
  const deadlineClass = isExpired ? `card--deadline` : ``;

  return (
    `<article class="card card--${color} ${repeatLineClass} ${deadlineClass}">
      <div class="card__form">
        <div class="card__inner">
          <div class="card__control">
            <button type="button" class="card__btn card__btn--edit">
              edit
            </button>
            <button type="button" class="card__btn card__btn--archive ${archiveButtonClass}">
              archive
            </button>
            <button
              type="button"
              class="card__btn card__btn--favorites ${favoriteButtonClass}"
            >
              favorites
            </button>
          </div>

          <div class="card__color-bar">
            <svg class="card__color-bar-wave" width="100%" height="10">
              <use xlink:href="#wave"></use>
            </svg>
          </div>

          <div class="card__textarea-wrap">
            <p class="card__text">${description}</p>
          </div>

          <div class="card__settings">
            <div class="card__details">
              <div class="card__dates">
                <div class="card__date-deadline">
                  <p class="card__input-deadline-wrap">
                    <span class="card__date">${date}</span>
                    <span class="card__time">${time}</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>`
  );
};

export default class Task extends AbstractComponent {
  constructor(task) {
    super();
    this._task = task;
    this._isRepeatingTask = Object.values(task.repeatingDays).some(Boolean);
  }
  getTemplate() {
    return returnTaskTemplate(this._task, this._isRepeatingTask);
  }
  addClickEditButton(cb) {
    this.getElement().querySelector(`.card__btn--edit`).addEventListener(`click`, cb);
  }
  addArchiveClick(cb) {
    this.getElement().querySelector(`.card__btn--archive`).addEventListener(`click`, cb);
  }
  addFavoriteClick(cb) {
    this.getElement().querySelector(`.card__btn--favorites`).addEventListener(`click`, cb);
  }
}
