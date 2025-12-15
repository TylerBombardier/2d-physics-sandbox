/**
 * This class handles the organization of the Tool classes and handles which Tool is currently active.
 */
export class ToolController{
    constructor(){
        this.tools = {};
        this.active = null;
    }

    register(name, tool) {
        this.tools[name] = tool;
    }

    setActive(name) {
        if (this.active === name) return;

        if (this.active && this.tools[this.active]) {
            this.tools[this.active].deactivate();
        }

        this.active = name;

        let tool = this.tools[name];
        if (tool) {
            tool.activate();
        }
    }

    setActiveToolOption(option,value){
        let tool = this.tools[this.active];

        tool[option] = value;
    }

    update(...args) {
        if (this.active && this.tools[this.active]) {
            if (typeof this.tools[this.active].update === "function") {
                this.tools[this.active].update(...args);
            }
        }
    }

    getActiveTool(){
        return this.tools[this.active];
    }
}