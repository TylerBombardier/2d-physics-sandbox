/**
 * Abstract class for all tools
 * onClick()
 * onDrag()
 * onRelease()
 * onCancel()
 */

export class AbstractTool{
    constructor(input,isSelected){
        this.input = input;
        this.isSelected = isSelected;
        if(this.constructor === AbstractTool){
            throw new Error("Cannot Instantiate an abstract class");
        }
    }

    onClick(){}

    setActive(){}
}