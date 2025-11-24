/**
 *  Grab objects in the scene with a mouse contraint
 */

import { AbstractTool } from "./AbstractTool";

export class GrabTool extends AbstractTool{
    constructor(input,mouseConstraint){
        super(input);
        this.mouseConstraint = mouseConstraint;
    }

    onClick(){

    }
}