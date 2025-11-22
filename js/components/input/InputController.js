/**
 * Controls the keybindings of all inputs, controls what's disabled or disabled.
 */

export class InputController{
    constructor(){
        this.keys = {};
        this.clicks = {};
        this.scrollDelta = 0;

        document.addEventListener("keydown", e => this.keys[e.key] = true);
        document.addEventListener("keyup", e => this.keys[e.key] = false);
        document.addEventListener("wheel", e => this.scrollDelta = e.deltaY);
        document.addEventListener("mousedown", e=> this.clicks[e.type] = true);
        document.addEventListener("mouseup", e=> this.clicks[e.type] = false);

    }

    isDown(key){
        return this.keys[key];
    }

    getScroll(){
        return this.scrollDelta;
    }

    endFrame(){
        this.scrollDelta = 0;
    }
}