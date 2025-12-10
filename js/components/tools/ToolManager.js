export class ToolManager{
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

        if (this.tools[name]) {
            this.tools[name].activate();
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