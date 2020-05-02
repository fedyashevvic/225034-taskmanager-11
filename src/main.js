import ControllerComponent from "./controllers/constroller.js";
import Board from "./components/board-template.js";
import {temprData} from "./components/temprData.js";
import TaskModel from "./models/tasks.js";

const taksModel = new TaskModel();
taksModel.setTasks(temprData);

const controller = new ControllerComponent(new Board(), taksModel);
controller.renderApp();
