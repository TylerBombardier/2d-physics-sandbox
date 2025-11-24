/**
 * Abstract class for all tools
 * onClick()
 * onDrag()
 * onRelease()
 * onCancel()
 */

export class AbstractTool{
    constructor(input){
        this.input = input;
        if(this.constructor === AbstractTool){
            throw new Error("Cannot Instantiate an abstract class");
        }
    }

    onClick(){}
}