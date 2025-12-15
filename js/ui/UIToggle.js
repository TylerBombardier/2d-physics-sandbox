/**
 * Handles the open and closed status of the UI panel
 */
export default class UIToggle{

    constructor(panelElement, toggleElement, closedClassName = "closed", openedClassName = "open"){
        this.panelElement = document.querySelector(panelElement); //Applies class to this element
        this.toggleElement = document.querySelector(toggleElement); //Applies click event listener to this element
        this.closedClassName = closedClassName;
        this.openedClassName = openedClassName;

        //Checks if it already has the closed class name and adjusts class name ccordingly
        this.isOpen = !this.panelElement.classList.contains(this.closedClassName);

        this.bind()
    }

    /**
     * Applies the event listener for any clicks
     */
    bind(){
        if(!this.toggleElement){
            console.log("UIToggle: ToggleElement not found!");
        }
        this.toggleElement.addEventListener("click", () => {
            this.toggle();
        });
    }

    /**
     * Opens the panel
     */
    open(){
        this.panelElement.classList.remove(this.closedClassName);
        this.panelElement.classList.add(this.openedClassName);
        
        this.isOpen = true;
    }

    /**
     * CLoses the panel
     */
    close(){
        this.panelElement.classList.remove(this.openedClassName);
        this.panelElement.classList.add(this.closedClassName);
        
        this.isOpen = false;
    }

    /**
     * Toggles the panel's status
     */
    toggle(){
        this.isOpen ? this.close() : this.open();
    }
}