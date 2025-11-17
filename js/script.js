import * as PIXI from 'pixi.js';
import Matter from 'matter-js';

const { Engine, Render, Runner, Bodies, World } = Matter;

let engine = Engine.create();
let world = engine.world;

let container = document.getElementById("sim-area");
let bounds = container.getBoundingClientRect();


let render = Render.create({
    element: document.getElementById("sim-area"),
    engine: engine,
    options: {
        width: bounds.width,
        height: bounds.height,
        wireframes: false,
        background: "#222"
    }
});

Render.run(render);

let runner = Runner.create();
Runner.run(runner, engine);

let ground = Bodies.rectangle(window.innerWidth/2,window.innerHeight-50,window.innerWidth, 100, { isStatic: true});
World.add(world, ground);

for(let i = 0; i < 5; i++){
    let box = Bodies.rectangle(400 + i*60, 100, 50, 50, {restitution: 0.7});
    World.add(world, box);
}