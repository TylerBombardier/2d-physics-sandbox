/**
 * The sandbox that contains the engine, the world, and camera.
 * All positional data pass through he to be normalized.
 */

export class Sandbox{

    constructor(camera = null){
        this.camera = camera;
    }

    // Converts the screen coordinates into canvas coordinates
    screenToWorld(screenCoords) {
        let bounds = this.camera.bounds;
        let canvas = this.camera.canvas.getBoundingClientRect();

        let scaleX = (bounds.max.x - bounds.min.x) / canvas.width;
        let scaleY = (bounds.max.y - bounds.min.y) / canvas.height;

        return {
            x: screenCoords.x * scaleX + bounds.min.x,
            y: screenCoords.y * scaleY + bounds.min.y
        };
    }

    // Converts world coordinates into canvas cordinates
    worldToScreen(worldCords){
    }
}