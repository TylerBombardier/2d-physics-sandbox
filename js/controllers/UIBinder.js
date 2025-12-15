export class UIBinder {
    constructor(toolController) {
        this.toolController = toolController;
    }

    /**
     * This method binds an input event listener on each data-bind tool classed element to adjust the values in the actual tool
     * @param {*} el 
     */
    bindInput(el) {
        const option = el.dataset.bind;

        el.addEventListener("input", () => {
            const tool = this.toolController.getActiveTool();

            let value;
            if (el.tagName === "MD-SWITCH") {
                value = el.selected;
            } else if (el.type === "color") {
                value = el.value;
            } else {
                value = parseFloat(el.value);
            }

            this.toolController.setActiveToolOption(option,value);
        });
    }

    /**
     * This method scans for any elements with a databind and calls a method to bind it with an input event listener.
     * @param {*} root 
     */
    scan(root = document) {
        root.querySelectorAll("[data-bind]").forEach(el => {
            this.bindInput(el);
        });
    }
}
