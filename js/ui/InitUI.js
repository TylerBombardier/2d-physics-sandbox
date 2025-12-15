import { ToolController } from "../controllers/ToolController";
import { ToolOptionsController } from "../controllers/ToolOptionsController";
import { UIBinder } from "../controllers/UIBinder";
import { ToolBar } from "./ToolBar";
import UIToggle from "./UIToggle";

/**
 * This class hnadles initalization of all UI related classes
 * @param {ToolController} toolController 
 */
export function initUI(toolController){
    let toolOptionsController = new ToolOptionsController("ui-tool-options");

    let toolBar = new ToolBar(toolController,toolOptionsController);

    let uiToggle = new UIToggle("#left-ui-panel","#ui-handle");

    let binder = new UIBinder(toolController);

    binder.scan(document.getElementById("ui-tool-options"));
}