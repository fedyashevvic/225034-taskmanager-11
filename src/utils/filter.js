const getArchiveTask = (tasks) => {
  return tasks.filter((it) => it.isArchive);
};

const getActiveTask = (tasks) => {
  return tasks.filter((it) => !it.isArchive);
};

const getFavoriteTask = (tasks) => {
  return tasks.filter((it) => it.isFavorite);
};
