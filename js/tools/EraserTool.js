import Matter from 'matter-js';

/**
 * Tool for erasing objects from the sandbox
 */

export class EraserTool{
    constructor(engine, render, input, sandbox){
        this.engine = engine;
        this.render = render;
        this.input = input;
        this.sandbox = sandbox;

        this.enabled = false;

        this.removeStatic = false;
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

            let target = null;

            for(let body of bodies){
                if(
                    Matter.Bounds.contains(body.bounds,worldPos) &&
                    Matter.Vertices.contains(body.vertices, worldPos)
                ) {
                    target = body;
                    break;
                }
            }

            if(target){
                if(!target.isStatic || this.removeStatic){
                    Matter.Composite.remove(this.engine.world, target);
                    console.log("Removed: ", target);
                }
            }
        }
    }
}