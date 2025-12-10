import { Mouse } from "matter-js";
import { MouseConstraint } from "matter-js";
import { World } from "matter-js";

export class GrabTool{
    constructor(engine, render, input){
        this.engine = engine;
        this.render = render;
        this.input = input;

        this.mouse = Mouse.create(render.canvas);

        this.mouseConstraint = MouseConstraint.create(engine, {
            mouse: this.mouse,
            constraint: {
                stiffness: 0.2,
                render: { visible: false }
            }
        });

        this.mouseConstraint.constraint.stiffness = 0;
        this.enabled = false;
    }

    activate() {
        if (!this.enabled) {
            this.enabled = true;
            this.mouseConstraint.constraint.stiffness = 0.2;
            World.add(this.engine.world, this.mouseConstraint);
        }
    }

    deactivate() {
        if (this.enabled) {
            this.enabled = false;
            this.mouseConstraint.constraint.stiffness = 0;
            World.remove(this.engine.world, this.mouseConstraint);
        }
    }

    update(camera) {
        if (!this.enabled) return;

        let bounds = this.render.bounds;

        let scaleX = (bounds.max.x - bounds.min.x) / this.render.canvas.width;
        let scaleY = (bounds.max.y - bounds.min.y) / this.render.canvas.height;

        Mouse.setScale(this.mouse, { x: scaleX, y: scaleY });
        Mouse.setOffset(this.mouse, bounds.min);
    }
}