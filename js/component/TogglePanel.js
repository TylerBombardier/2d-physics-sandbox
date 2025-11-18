/**
 * Handles the open and closed status of a UI panel
 */
export default class UIToggle{

    constructor(panelElement, toggleElement, closedClassName = "closed"){
        this.panelElement = document.querySelector(panelElement); //Applies class to this element
        this.toggleElement = document.querySelector(toggleElement); //Applies click event listener to this element
        this.closedClassName = closedClassName;

        if(!this.panelElement || !this.toggleElement){
            throw new Error("TogglePanel: Panel or Toggle not found.")
        }

        //Checks if it already has the closed class name and adjusts open value accordingly
        this.isOpen = !this.panelElement.classList.contains(this.closedClassName);

        this.toggleElement.addEventListener("click", () => this.toggle());
    }

    //Open Panel
    open(){
        this.panelElement.classList.remove(this.closedClassName);
        this.isOpen = true;
    }

    //Close Panel
    close(){
        this.panelElement.classList.add(this.closedClassName);
        this.isOpen = false;
    }

    //Toggle Panel open status
    toggle(){
        this.isOpen ? this.close() : this.open();
    }
}