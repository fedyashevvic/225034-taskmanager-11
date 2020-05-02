export default class Task {
  constructor() {
    this._tasks = [];

    this._dataChangeHandlers = [];
  }
  getTasks() {
    return this._tasks;
  }
  setTasks(tasks) {
    this._tasks = Array.from(tasks);
    this._callHandlers(this._dataChangeHandlers);
  }
  updateTask(id, task) {
    const index = this._tasks.findIndex((it) => it.id === id);

    if (index === -1) {
      return;
    }

    this._tasks = [].concat(this._tasks.slice(0, index), task, this._tasks.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);
  }
  setDataChangeHandlers(handlers) {
    this._dataChangeHandlers.push(handlers);
  }
  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
