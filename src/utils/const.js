const MONTH_NAMES = [
  `January`,
  `February`,
  `March`,
  `April`,
  `May`,
  `June`,
  `July`,
  `August`,
  `September`,
  `October`,
  `November`,
  `December`,
];
const WEEK_DAYS = [`mo`, `tu`, `we`, `th`, `fr`, `sa`, `su`];
const TEMPLATE_COLORS = [`black`, `yellow`, `blue`, `green`, `pink`];
const RenderPosition = {
  AFTERBEGIN: `afterbegin`,
  BEFOREEND: `beforeend`
};
const SortType = {
  DEFAULT: `default`,
  DATEUP: `date-up`,
  DATEDOWN: `date-down`
};
const FilterType = {
  ALL: `all`,
  ARCHIVE: `archive`,
  FAVORITES: `favorites`,
  OVERDUE: `overdue`,
  REPEATING: `repeating`,
  TODAY: `today`,
};

export {MONTH_NAMES, WEEK_DAYS, TEMPLATE_COLORS, RenderPosition, SortType, FilterType};
