/**
 * The camera that moves through the sandbox
 */

export class Camera{

    constructor(render){
        this.render = render;
        this.canvas = this.render.canvas;

        this.camHeight = this.getMaxY() - this.getMinY();
        this.camWidth = this.getMaxX() - this.getMinX();
        
        this.aspectRatio = this.getCameraWidth() / this.getCameraHeight();
        this.defaultZoomHeight = this.getCameraHeight();
        this.deftaultZoomWidth = this.getCameraHeight();
        this.zoomIncrement = 200;

        this.setupZoom();
        this.setupPanning();
    }

    getCanvasHeight(){
        return this.canvas.height;
    }

    getCanvasWidth(){
        return this.canvas.width;
    }

    getCameraHeight(){
        return this.getMaxY() - this.getMinY();
    }

    getCameraWidth(){
        return this.getMaxX() - this.getMinX();
    }

    getCameraBounds(){
        return this.render.bounds;
    }

    getCanvasBounds(){
        return this.render.canvas.getBoundingClientRect();
    }

    getMinX(){
        return this.render.bounds.min.x;
    }

    getMaxX(){
        return this.render.bounds.max.x;
    }

    getMinY(){
        return this.render.bounds.min.y;
    }
    
    getMaxY(){
        return this.render.bounds.max.y;
    }

    setMinX(newMinX){
        this.render.bounds.min.x = newMinX;
    }

    setMaxX(newMaxX){
        this.render.bounds.max.x = newMaxX;
    }

    setMinY(newMinY){
        this.render.bounds.min.y = newMinY;
    }

    setMaxY(newMaxY){
        this.render.bounds.max.y = newMaxY;
    }

    setupPanning(){
        // Setup event listeners for panning
    }

    pan(dx,dy){
        // Moves the camera
        this.setMinX(this.getMinX()+dx);
        this.setMaxX(this.getMaxX()+dx);
        this.setMinY(this.getMinY()+dy);
        this.setMaxY(this.getMaxY()+dy);

        console.log("Panned "+(dx >= 0 ? "Right" : "Left")+" by "+Math.abs(dx))
        console.log("Panned "+(dy >= 0 ? "Down" : "Up")+" by "+Math.abs(dy));
    }

    setupZoom(){
        // Setup event listeners for zooming
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
        let newHeight = this.getCameraHeight() + zoomAmount;

        // Adjust the width accordingly using the aspect ratio
        let newWidth = newHeight * this.aspectRatio;

        // Find the difference between those two heights to calculate the amount to zoom in or out.
        let heightDiff = newHeight - this.getCameraHeight();
        let widthDiff = newWidth - this.getCameraWidth();

        // Change the render bounds by the difference and center it
        this.setMinX(this.getMinX()-widthDiff / 2);
        this.setMaxX(this.getMaxX()+widthDiff / 2);
        this.setMinY(this.getMinY()-heightDiff / 2);
        this.setMaxY(this.getMaxY()+heightDiff / 2);
    }
}