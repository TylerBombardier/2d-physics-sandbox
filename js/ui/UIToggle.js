/**
 * Handles the open and closed status of a UI panel
 */
export default class UIToggle{

    constructor(panelElement, toggleElement, closedClassName = "closed", openedClassName = "open"){
        this.panelElement = document.querySelector(panelElement); //Applies class to this element
        this.toggleElement = document.querySelector(toggleElement); //Applies click event listener to this element
        this.closedClassName = closedClassName;
        this.openedClassName = openedClassName;

        //Checks if it already has the closed class name and adjusts class name ccordingly
        this.isOpen = !this.panelElement.classList.contains(this.closedClassName);

        this.handle = document.getElementById("ui-handle");

        this.bind()
    }

    bind(){
        this.handle.addEventListener("click", () => {
            this.toggle();
        });
    }

    //Open Panel
    open(){
        this.panelElement.classList.remove(this.closedClassName);
        this.panelElement.classList.add(this.openedClassName);
        
        this.isOpen = true;
    }

    //Close Panel
    close(){
        this.panelElement.classList.remove(this.openedClassName);
        this.panelElement.classList.add(this.closedClassName);
        
        this.isOpen = false;
    }

    //Toggle Panel open status
    toggle(){
        this.isOpen ? this.close() : this.open();
    }
}