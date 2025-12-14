import Matter from 'matter-js';

/**
 * Color shapes and joints
 */

export class ColorTool{
    constructor(engine, render, input, sandbox){
        this.engine = engine;
        this.render = render;
        this.input = input;
        this.sandbox = sandbox;

        this.enabled = false;
        this.currentColor = "#ff0000";
        this.colorStatic = false;
    }

    activate() {
        this.enabled = true;
    }

    deactivate() {
        this.enabled = false;
    }

    update() {
        if(!this.enabled) return;

        if(this.input.isPressed(0)){
            let screenPos = this.input.getMousePos();
            let worldPos = this.sandbox.screenToWorld(screenPos);

            let bodies = Matter.Composite.allBodies(this.engine.world);

            let target = detectTarget(bodies,worldPos);

            if(target){
                if(!target.isStatic || this.colorStatic){
                    target.render.fillStyle = this.currentColor;
                    target.render.strokeStyle = this.currentColor;
                    console.log("Colored to ",this.currentColor,": ",target);
                }
            }
        }
    }
}