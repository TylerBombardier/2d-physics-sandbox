/**
 * Tracks the active tool, gives each tool an ID, add Tools, remove Tools.
 */
export class ToolManager {
    constructor(){
        this.tools = new Map();
        this.activeTool = null;
    }

    registerTool(name, tool) {
        tool.id = name;
        this.tools.set(name, tool);
    }

    setTool(name) {
        const newTool = this.tools.get(name);
        if (!newTool) {
            throw new Error("Tool not found: " + name);
        }

        if (this.activeTool?.disable) {
            this.activeTool.disable();
        }
        if (this.activeTool?.onCancel) {
            this.activeTool.onCancel();
        }

        this.activeTool = newTool;

        if (this.activeTool?.enable) {
            this.activeTool.enable();
        }
    }

    getActiveTool() {
        return this.activeTool;
    }
}