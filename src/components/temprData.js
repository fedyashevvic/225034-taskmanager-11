const descriptions = [`Изучить теорию`, `Сделать домашку`, `Пройти интенсив на соточку`];
const colors = [`black`, `yellow`, `blue`, `green`, `pink`];
const temprData = [];
const generateMoki = () => {
  return {
    description: descriptions[Math.floor(Math.random() * Math.floor(3))],
    dueDate: Math.random() > 0.5 ? new Date() : null,
    color: colors[Math.floor(Math.random() * Math.floor(5))],
    isRepeat: Math.random() > 0.5,
    isFavorite: Math.random() > 0.5,
    isArchive: Math.random() > 0.5
  };
};

for (let i = 0; i < 0; i++) {
  temprData.push(generateMoki());
}

export {temprData};
