import {Key} from "../components/utils.js";
import {render, replace} from "../components/render.js";
import Task from "../components/task-template.js";
import TaskEdit from "../components/create-task-template.js";

export default class TaskController {
  renderTask(taskListElement, task) {
    const taskComponent = new Task(task);
    const taskEditComponent = new TaskEdit(task);

    render(taskListElement, taskComponent);

    const taskToEditHandler = () => {
      replace(taskListElement, taskEditComponent, taskComponent);
      const closeOnEsc = (evt) => {
        if (evt.key === Key.ESC) {
          editToTaskHandler();
          window.removeEventListener(`keydown`, closeOnEsc);
        }
      };
      window.addEventListener(`keydown`, closeOnEsc);
    };
    const editToTaskHandler = () => {
      replace(taskListElement, taskComponent, taskEditComponent);

    };

    taskComponent.addClickEditButton(taskToEditHandler);
    taskEditComponent.addClickEditButton(editToTaskHandler);
  }
}
