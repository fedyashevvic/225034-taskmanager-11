import {WEEK_DAYS} from "./const.js";

const descriptions = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const colors = [`black`, `yellow`, `blue`, `green`, `pink`];
const temprData = [];
const returnRepeatingDays = () => {
  let repeatingDays = [];
  for (const day of WEEK_DAYS) {
    const activeDay = Math.random() > 0.5;
    if (activeDay === true) {
      repeatingDays.push(day);
    }
  }
  return repeatingDays;
};

const generateMoki = () => {
  return {
    id: String(parseInt(Date.now() + Math.random, 10)),
    description: descriptions[Math.floor(Math.random() * Math.floor(3))],
    dueDate: Math.random() > 0.5 ? new Date() : null,
    color: colors[Math.floor(Math.random() * Math.floor(5))],
    repeatingDays: returnRepeatingDays(),
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5
  };
};

for (let i = 0; i < 20; i++) {
  temprData.push(generateMoki());
}

export {temprData};
