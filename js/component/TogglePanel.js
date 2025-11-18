/**
 * Handles the open and closed status of a UI panel
 */
export default class TogglePanel{

    constructor(panelElement, toggleElement, closedClassName = "closed"){
        this.panelElement = document.querySelector(panelElement);
        this.toggleElement = document.querySelector(toggleElement);
        this.closedClassName = closedClassName;

        if(!this.panelElement || !this.toggleElement){
            throw new Error("TogglePanel: Panel or Toggle not found.")
        }

        this.isOpen = !this.panelElement.classList.contains(this.closedClassName);
        this.toggleElement.addEventListener("click", () => this.toggle());
    }

    open(){
        this.panelElement.classList.remove(this.closedClassName);
        this.isOpen = true;
    }

    close(){
        this.panelElement.classList.add(this.closedClassName);
        this.isOpen = false;
    }

    toggle(){
        this.isOpen ? this.close() : this.open();
    }
}