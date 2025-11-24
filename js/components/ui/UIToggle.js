/**
 * Handles the open and closed status of a UI panel
 */
export default class UIToggle{

    constructor(panelElement, toggleElement, closedClassName = "closed", openedClassName = "open"){
        this.panelElement = document.querySelector(panelElement); //Applies class to this element
        this.toggleElement = document.querySelector(toggleElement); //Applies click event listener to this element
        this.closedClassName = closedClassName;
        this.openedClassNamed = openedClassName;

        if(!this.panelElement || !this.toggleElement){
            throw new Error("UIToggle: Panel or Toggle not found.")
        }

        //Checks if it already has the closed class name and adjusts open value accordingly
        this.isOpen = !this.panelElement.classList.contains(this.closedClassName);

        switch(this.isOpen){
            case true:
                this.open();
                break;
            case false:
                this.close();
                break;
        }

        this.toggleElement.addEventListener("click", () => this.toggle());
    }

    //Open Panel
    open(){
        this.panelElement.classList.remove(this.closedClassName);
        this.panelElement.classList.add(this.openedClassNamed);
        document.getElementById("arrow").innerHTML = "arrow_menu_close";
        this.isOpen = true;
    }

    //Close Panel
    close(){
        this.panelElement.classList.remove(this.openedClassNamed);
        this.panelElement.classList.add(this.closedClassName);
        document.getElementById("arrow").innerHTML = "arrow_menu_open";
        this.isOpen = false;
    }

    //Toggle Panel open status
    toggle(){
        this.isOpen ? this.close() : this.open();
    }
}