/**
 * Tracks the active tool, gives each tool an ID, add Tools, remove Tools.
 */
export default class UIToolbox {
    constructor() {
        this.tools = [];
        this.selectedTool = null; 
    }

    registerTool(tool) {
        this.tools.push(tool);
    }

    setTool(toolName) {
        let tool = this.tools.find(t => t.name === toolName);

        if (!tool) {
            throw new Error("Tool not found: " + name);
        }

        if (this.selectedTool?.onCancel) {
            this.selectedTool.onCancel();
        }

        this.selectedTool = tool;
    }

    selectedTool(){
        return this.selectedTool;
    }
}