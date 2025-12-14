import Matter from 'matter-js';
import { detectBodyAtPoint } from '../components/DetectTarget';

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

        this.eraseStatic = false;
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

            let target = detectBodyAtPoint(bodies,worldPos);

            if(target){
                if(!target.isStatic || this.eraseStatic){
                    Matter.Composite.remove(this.engine.world, target);
                    console.log("Removed: ", target);
                }
            }
        }
    }
}