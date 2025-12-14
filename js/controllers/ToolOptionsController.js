export class ToolOptionsController {
    constructor(panelId, toolController) {
        this.panel = document.getElementById(panelId);
        this.toolController = toolController;

        this.bind();
    }

    showTool(toolId) {
        this.panel.querySelectorAll('.tool-panel').forEach(panel => panel.classList.add('hidden'));

        let selected = this.panel.querySelector(`#${toolId}`);
        if (selected) selected.classList.remove('hidden');
    }

    bind(){
        // slider inputs
        this.panel.querySelectorAll("md-slider").forEach(slider => {
            slider.addEventListener("input", () => this.update(slider));
        });

        // color inputs
        this.panel.querySelectorAll("input[type='color']").forEach(input => {
            input.addEventListener("input", () => this.update(input));
        });

        // switches
        this.panel.querySelectorAll("md-switch").forEach(sw => {
            sw.addEventListener("change", () => this.update(sw));
        });
    }

    update(input){
        let tool = this.toolController.getActiveTool();
        if(!tool) {
            console.log("ToolsOptionsController: Tool not found");
            return;
        }

        let prop = input.dataset.bind;
        if(!prop || !(prop in tool)){
            console.log("ToolsOptionController: Coulld not find the data-bind");
        }

        let value;

        if(input.tagName === "MD-SWITCH"){
            value = input.selected;
        } else if (input.type === "color"){
            value = input.value;
        } else {
            value = parseFloat(input.value);
        }

        tool[prop] = value;
    }
}