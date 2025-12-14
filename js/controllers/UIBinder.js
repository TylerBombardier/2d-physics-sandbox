export class UIBinder {
    constructor(toolController) {
        this.toolController = toolController;
    }

    bindInput(el) {
        const prop = el.dataset.bind;

        el.addEventListener("input", () => {
            const tool = this.toolController.getActiveTool();
            if (!tool || !(prop in tool)) return;

            let value;
            if (el.tagName === "MD-SWITCH") {
                value = el.selected;
            } else if (el.type === "color") {
                value = el.value;
            } else {
                value = parseFloat(el.value);
            }

            tool[prop] = value;
        });
    }

    scan(root = document) {
        root.querySelectorAll("[data-bind]").forEach(el => {
            this.bindInput(el);
        });
    }
}
