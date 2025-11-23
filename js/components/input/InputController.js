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

        document.addEventListener("keydown", e => this.keys[e.key] = true);
        document.addEventListener("keyup", e => this.keys[e.key] = false);
        document.addEventListener("wheel", e => this.scrollDelta = e.deltaY);
        
        document.addEventListener("mousedown", e=> {
            this.clicks[e.button] = true;
            this.pressed[e.button] = true;
        });

        document.addEventListener("mouseup", e=> {
            this.clicks[e.button] = false;
            this.pressed[e.button] = false;
        });

        document.addEventListener("mousemove", e=> {
            this.mousePos.x = e.x
            this.mousePos.y = e.y
        });
    }

    isDown(key){
        return this.keys[key];
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
    }
}