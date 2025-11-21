/**
 * The camera that moves through the sandbox
 */

export class Camera{

    constructor(render){
        this.render = render;
        this.bounds = render.bounds;
        this.canvas = render.canvas;
        
        this.aspectRatio = this.canvas.width / this.canvas.height;
        this.defaultZoomHeight = this.camHeight;
        this.deftaultZoomWidth = this.camWidth;

        this.targetHeight = this.camHeight;

        this.zoomIncrement = 200;
        this.panLerp = 0.15;
        this.zoomLerp = 0.15;
    }

    update(){
        this.handlePanning();
        this.handleSmoothZoom();
    }

    handleSmoothPanning(){

    }

    handleSmoothZoom(){

    }

    get camHeight(){
        return this.bounds.max.y - this.bounds.min.y;
    }

    get camWidth(){
        return this.bounds.max.x - this.bounds.min.x;
    }

    pan(dx,dy){
        // Moves the camera
        this.bounds.min.x += dx;
        this.bounds.max.x += dx;
        this.bounds.min.y += dy;
        this.bounds.max.y += dy;

        // console.log("Panned "+(dx >= 0 ? "Right" : "Left")+" by "+Math.abs(dx))
        // console.log("Panned "+(dy >= 0 ? "Down" : "Up")+" by "+Math.abs(dy));
    }

    zoomIn(zoomAmount = this.zoomIncrement){
        this.setZoom(zoomAmount*-1);
    }

    zoomOut(zoomAmount = this.zoomIncrement){
        this.setZoom(zoomAmount);
    }

    setZoom(zoomAmount) {
        // Calculate the desired height based on the increment amount
        let newHeight = this.camHeight + zoomAmount;

        // Adjust the width accordingly using the aspect ratio
        let newWidth = newHeight * this.aspectRatio;

        // Find the difference between those two heights to calculate the amount to zoom in or out.
        let heightDiff = newHeight - this.camHeight;
        let widthDiff = newWidth - this.camWidth;

        // Change the render bounds by the difference and center it
        this.bounds.min.x -= widthDiff / 2;
        this.bounds.max.x += widthDiff / 2;
        this.bounds.min.y -= heightDiff / 2;
        this.bounds.max.y += heightDiff / 2;
    }
}