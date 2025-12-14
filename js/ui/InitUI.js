import { ToolOptionsController } from "../controllers/ToolOptionsController";
import { UIBinder } from "../controllers/UIBinder";
import { ToolBar } from "./ToolBar";
import UIToggle from "./UIToggle";

/*
This function will handle the initialization of all ui elements being binded to their data.
*/
export function initUI(toolController){
    let toolOptionsController = new ToolOptionsController("ui-tool-options");

    let toolBar = new ToolBar(toolController,toolOptionsController);
    let uiToggle = new UIToggle("#left-ui-panel","#ui-handle");

    let binder = new UIBinder(toolController);
    binder.scan();
}