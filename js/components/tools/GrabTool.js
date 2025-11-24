/**
 *  Grab objects in the scene with a mouse contraint
 */

import { AbstractTool } from "./AbstractTool";

export class GrabTool extends AbstractTool{
    constructor(input,isSelected,mouseConstraint){
        super(input,isSelected);
        this.mouseConstraint = mouseConstraint;
    }

    onClick(){

    }

    setActive(bool){
        this.isSelected = bool;
    }
}