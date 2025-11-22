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

        // Target positions for smooth panning
        this.targetX = this.camCenterX;
        this.targetY = this.camCenterY;

        // Target positions for smooth zooming
        this.targetZoom = this.camHeight;

        this.panLerp = 0.15;
        this.zoomLerp = 0.15;
        this.zoomCenter = null;
        this.minZoom = this.defaultZoomHeight / 5;
        this.maxZoom = this.defaultZoomHeight * 5;
    }

    update(){
        this.handleSmoothPanning();
        this.handleSmoothZoom();
    }

    get camHeight(){
        return this.bounds.max.y - this.bounds.min.y;
    }

    get camWidth(){
        return this.bounds.max.x - this.bounds.min.x;
    }

    get camCenterX() {
        return (this.bounds.min.x + this.bounds.max.x) / 2;
    }

    get camCenterY() {
        return (this.bounds.min.y + this.bounds.max.y) / 2;
    }

    handleSmoothPanning(){
        let dx = (this.targetX - this.camCenterX) * this.panLerp;
        let dy = (this.targetY - this.camCenterY) * this.panLerp;

        this.pan(dx, dy);
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

    handleSmoothZoom() {
        let diff = this.targetZoom - this.camHeight;
        let step = diff * this.zoomLerp;
        this.setZoom(step);
    }

    zoomIn(zoomAmount = this.zoomIncrement){
        this.targetZoom -= zoomAmount;
        if(this.targetZoom < this.minZoom) this.targetZoom = this.minZoom;
    }

    zoomOut(zoomAmount = this.zoomIncrement){
        this.targetZoom += zoomAmount;
        if(this.targetZoom > this.maxZoom) this.targetZoom = this.maxZoom;
    }

    setZoom(zoomAmount) {
        let newHeight = this.camHeight + zoomAmount;
        let newWidth = newHeight * this.aspectRatio;

        let deltaHeight = newHeight - this.camHeight;
        let deltaWidth = newWidth - this.camWidth;

        this.bounds.min.x -= deltaWidth;
        this.bounds.max.x += deltaWidth;
        this.bounds.min.y -= deltaHeight;
        this.bounds.max.y += deltaHeight;
    }
}