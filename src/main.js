import ControllerComponent from "./controllers/constroller.js";
import Board from "./components/board-template.js";

const controller = new ControllerComponent(new Board());
controller.renderApp();
