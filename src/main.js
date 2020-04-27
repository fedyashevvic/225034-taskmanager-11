import ControllerComponent from "./controllers/constroller.js";
import Board from "./components/board-template.js";
import {temprData} from "./components/temprData.js";

const controller = new ControllerComponent(new Board());
controller.renderApp(temprData);
