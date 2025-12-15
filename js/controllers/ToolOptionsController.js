/**
 * This is the class that actually hides and displays the options for each tool
 */
export class ToolOptionsController {
    constructor(panelId) {
        this.panel = document.getElementById(panelId);
    }

    showToolOptions(toolId) {
        this.panel.querySelectorAll('.tool-panel').forEach(panel => panel.classList.add('hidden'));

        let selected = this.panel.querySelector(`#${toolId}`);
        if (selected) selected.classList.remove('hidden');
    }
}