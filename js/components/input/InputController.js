/**
 * Controls the keybindings of all inputs, controls what's disabled or disabled.
 */

export class InputController{
    constructor(){
        this.keys = {};
        this.scrollDelta = 0;

        document.addEventListener("keydown", e => this.keys[e.key] = true);
        document.addEventListener("keyup", e => this.keys[e.key] = true);
        document.addEventListener("wheel", e => this.scrollDelta = e.deltaY);
    }

    isDown(key){
        return this.keys[key];
    }

    update(){
        let speed = 10;

        if(keys["w"]){
            camera.pan(0, -speed);
        }
        if(keys["a"]){
            camera.pan(-speed,0);
        }
        if(keys["s"]){
            camera.pan(0,speed);
        }
        if(keys["d"]){
            camera.pan(speed,0);
        }
    }
}