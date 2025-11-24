/**
 * Abstract class for all tools
 * onClick()
 * onDrag()
 * onRelease()
 * onCancel()
 */

class AbstractTool{
    constructor(input){
        if(this.constructor === AbstractTool){
            throw new Error("Cannot Instantiate an abstract class");
        }
    }
}