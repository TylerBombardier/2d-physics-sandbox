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

    update(...args) {
        if (this.active && this.tools[this.active]) {
            if (typeof this.tools[this.active].update === "function") {
                this.tools[this.active].update(...args);
            }
        }
    }
}