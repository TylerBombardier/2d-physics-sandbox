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

    select(tool, panel) {
        this.toolController.setActive(tool);
        this.toolOptionsController.showTool(panel);
    }

    highlight(activeButton) {
        this.tools.forEach(b => b.classList.remove("selected"));
        activeButton.classList.add("selected");
    }

}