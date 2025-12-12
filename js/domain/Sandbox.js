/**
 * - The sandbox that contains the engine, the world, and camera.
 * - All positional data passes through he to be normalized.
 * - Handles the creation, deletion, and updating, of shapes.
 * - Initalizes scene layout, wall layout, etc.s
 */

import { Bodies, Composite } from 'matter-js';

export class Sandbox{

    constructor(engine, camera){
        this.engine = engine;
        this.world = engine.world;
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

    // Spawns a rectangle
    spawnRectangle({x, y}, w, h, options = {}) {
        let worldPos = this.screenToWorld({ x, y });
        let rect = Bodies.rectangle(worldPos.x, worldPos.y, w, h, options);
        Composite.add(this.world, rect);
        return rect;
    }

    // Spawn barries
    spawnBarriers(){
        let barrierDistance = 3000;
        let barrierThickness = 1000;
        let ground = Bodies.rectangle(
            (window.innerWidth / 2),
            window.innerHeight + (barrierThickness / 2),
            barrierDistance,
            barrierThickness,
            {isStatic: true}
        );

        // let leftWall = Bodies.rectangle(
        //     (window.innerWidth / 2) - (barrierDistance / 2) - (barrierThickness / 2),
        //     window.innerHeight - (barrierDistance / 2),
        //     barrierThickness,
        //     barrierDistance,
        //     { isStatic: true }
        // );

        // let rightWall = Bodies.rectangle(
        //     (window.innerWidth / 2) + (barrierDistance / 2) + (barrierThickness / 2),
        //     window.innerHeight - (barrierDistance / 2),
        //     barrierThickness,
        //     barrierDistance,
        //     { isStatic: true }
        // )

        // let ceiling = Bodies.rectangle(
        //     (window.innerWidth / 2),
        //     window.innerHeight - (barrierThickness / 2) - (barrierDistance),
        //     barrierDistance,
        //     barrierThickness,
        //     {isStatic: true}
        // );

        Composite.add(this.world, ground);
    }
}