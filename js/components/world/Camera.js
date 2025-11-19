/**
 * The camera that moves through the sandbox
 */

export class Camera{

    static defaultZoomHeight;
    static deftaultZoomWidth;
    static zoomIncrement = 200;

    constructor(render){
        this.render = render;
        this.height = render.bounds.max.y - render.bounds.min.y;
        this.width = render.bounds.max.x - render.bounds.min.x;
        this.aspectRatio = this.width / this.height;

        //Remake this later to be better, check Obsidian Notes for documentation
        document.body.addEventListener("wheel", e => {
            e.deltaY < 0 ? this.zoomIn() : this.zoomOut();
            console.log("Zoom " + ((e.deltaY < 0) ? "in" : "out") + " by " + Camera.zoomIncrement + " pixels");

        });
    }

    zoomIn(zoomAmount = Camera.zoomIncrement){
        this.setZoom(zoomAmount*-1);
    }

    zoomOut(zoomAmount = Camera.zoomIncrement){
        this.setZoom(zoomAmount);
    }

    setZoom(zoomAmount) {
        //Calculate the desired height based on the increment amount
        let newHeight = this.height + zoomAmount;

        //Adjust the width accordingly using the aspect ratio
        let newWidth = newHeight * this.aspectRatio;

        //Find the difference between those two heights to calculate the amount to zoom in or out.
        let heightDiff = newHeight - this.height;
        let widthDiff = newWidth - this.width;

        //
        this.render.bounds.min.x -= widthDiff / 2;
        this.render.bounds.max.x += widthDiff / 2;
        this.render.bounds.min.y -= heightDiff / 2;
        this.render.bounds.max.y += heightDiff / 2;
        
        this.height = newHeight;
        this.width = newWidth;
    }
}