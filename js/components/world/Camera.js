/**
 * The camera that moves through the sandbox
 */

export class Camera{

    constructor(render){
        this.render = render;
        this.height = render.bounds.max.y - render.bounds.min.y;
        this.width = render.bounds.max.x - render.bounds.min.x;
        this.aspectRatio = this.width / this.height;
        this.defaultZoomHeight = this.height;
        this.deftaultZoomWidth = this.width;
        this.zoomIncrement = 200;

        this.setupZoom();
        this.setupPanning();
    }

    getHeight(){
        return this.height;
    }

    getWidth(){
        return this.width;
    }

    setupPanning(){
        //Setup event listeners for panning
    }

    pan(dx,dy){
        //Helper method for panning
    }

    setupZoom(){
        // TODO Add smoothing
        document.body.addEventListener("wheel", e => {
            e.deltaY < 0 ? this.zoomIn() : this.zoomOut();
            console.log("Zoom " + ((e.deltaY < 0) ? "in" : "out") + " by " + this.zoomIncrement + " pixels");

        });
    }

    zoomIn(zoomAmount = this.zoomIncrement){
        this.setZoom(zoomAmount*-1);
    }

    zoomOut(zoomAmount = this.zoomIncrement){
        this.setZoom(zoomAmount);
    }

    setZoom(zoomAmount) {
        // Calculate the desired height based on the increment amount
        let newHeight = this.height + zoomAmount;

        // Adjust the width accordingly using the aspect ratio
        let newWidth = newHeight * this.aspectRatio;

        // Find the difference between those two heights to calculate the amount to zoom in or out.
        let heightDiff = newHeight - this.height;
        let widthDiff = newWidth - this.width;

        // Change the render bounds by the difference and center it
        this.render.bounds.min.x -= widthDiff / 2;
        this.render.bounds.max.x += widthDiff / 2;
        this.render.bounds.min.y -= heightDiff / 2;
        this.render.bounds.max.y += heightDiff / 2;
        
        // Update the current size
        this.height = newHeight;
        this.width = newWidth;
    }
}