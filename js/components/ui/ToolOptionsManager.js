export class ToolOptionsManager{
    constructor(panelId){
        this.panel = document.getElementById(panelId);
    }

    loadTemplate(id) {
        this.clear();
        let template = document.getElementById(id);
        console.log(template);
        if (!template) return;

        let clone = template.content.cloneNode(true);
        this.panel.appendChild(clone);
    }

    clear() {
        this.panel.innerHTML = "";
    }
}