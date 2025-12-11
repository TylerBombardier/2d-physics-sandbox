export class ToolOptionsManager {
  constructor(panelId) {
    this.panel = document.getElementById(panelId);
  }

  showTool(toolId) {
    this.panel.querySelectorAll('.tool-panel').forEach(panel => panel.classList.add('hidden'));

    let selected = this.panel.querySelector(`#${toolId}`);
    if (selected) selected.classList.remove('hidden');
  }
}