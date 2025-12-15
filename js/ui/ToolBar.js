/**
 * This class delegates which tool options are being displayed and which tool button is selected.
 * 
 * It makes sure the ToolController and ToolOptionsController are in sync
 */
export class ToolBar{
    constructor(toolController,toolOptionsController){
        this.toolController = toolController;
        this.toolOptionsController = toolOptionsController;

        this.tools = document.querySelectorAll(".tools");

        this.bind();
    }

    bind() {
        document.getElementById("tool-grab").addEventListener("click", () => this.select("grab", "ui-grab"));

        document.getElementById("tool-color").addEventListener("click", () => this.select("color", "ui-color"));

        document.getElementById("tool-eraser").addEventListener("click", () => this.select("eraser", "ui-eraser"));

        this.tools.forEach(button => {
            button.addEventListener("click", () => this.highlight(button));
        });
    }

    select(toolName, toolOptionsID) {
        this.toolController.setActive(toolName);
        this.toolOptionsController.showToolOptions(toolOptionsID);
    }

    highlight(clickedButton) {
        this.tools.forEach(b => b.classList.remove("selected"));
        clickedButton.classList.add("selected");
    }

}