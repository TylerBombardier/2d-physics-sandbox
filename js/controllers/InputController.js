/**
 * Controls the keybindings of all inputs, controls what's disabled or disabled.
 */

export class InputController{
    constructor(){
        this.keys = {};
        this.clicks = {};
        this.pressed = {};
        this.mousePos = {x: 0, y: 0};
        this.scrollDelta = 0;
        this.lastClickedElement = null;
        this.lastDroppedElement = null;

        document.addEventListener("keydown", e => this.keys[e.code] = true);
        document.addEventListener("keyup", e => this.keys[e.code] = false);
        document.addEventListener("wheel", e => this.scrollDelta = e.deltaY);
        
        document.addEventListener("mousedown", e=> {
            this.clicks[e.button] = true;
            this.pressed[e.button] = true;
            this.lastClickedElement = e.target;
        });

        document.addEventListener("mouseup", e=> {
            this.clicks[e.button] = false;
            this.pressed[e.button] = false;
            this.lastDroppedElement = e.target;
        });

        document.addEventListener("mousemove", e=> {
            this.mousePos.x = e.x
            this.mousePos.y = e.y
        });
    }

    isDown(code){
        return this.keys[code];
    }

    isClicked(btn){
        return this.clicks[btn];
    }

    isPressed(btn){
        return this.pressed[btn]
    }

    getMousePos(){
        return this.mousePos;
    }

    getScroll(){
        return this.scrollDelta;
    }

    endFrame(){
        this.scrollDelta = 0;
        this.clicks = {}
        this.lastClickedElement = null;
    }
}