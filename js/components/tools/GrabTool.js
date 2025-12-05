/**
 *  Grab objects in the scene with a mouse contraint
 */

import { AbstractTool } from "./AbstractTool";

export class GrabTool extends AbstractTool{
    constructor(input,mouseConstraint){
        super(input);
        this.mouseConstraint = mouseConstraint;
    }

    enable() {
        this.mouseConstraint.constraint.stiffness = 0.9;
    }

    disable() {
        this.mouseConstraint.constraint.stiffness = 0;
    }

    onClick() {
        console.log("Grab!");
    }
}