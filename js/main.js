import Matter from 'matter-js';
import UIToggle from './components/ui/UIToggle';
import { Camera } from './components/world/Camera';
import { Sandbox } from './components/world/Sandbox';

//Destructuring to extract specific modules
const { Engine, Render, Runner, Bodies, World, Composite } = Matter;

let engine = Engine.create(); //Engine creation
let world = engine.world; //World creation

const sceneContainer = document.getElementById("sim-area");
const bounds = sceneContainer.getBoundingClientRect();

let render = Render.create({
element: sceneContainer,
engine: engine,
options: {
    width: bounds.width,
    height: bounds.height,
    wireframes: false,
    background: 'transparent',
    hasBounds: true,
}
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(window.innerWidth/2, window.innerHeight+25, window.innerWidth, 50, { isStatic: true });

// add all of the bodies to the world
Composite.add(world, [boxA, boxB, ground]);

Render.run(render);
Render.setPixelRatio(render, window.devicePixelRatio); 

let runner = Runner.create();

Runner.run(runner, engine);

//Handles toggling the opening and closing of the UI
let uiToggle = new UIToggle("#left-ui-panel","#ui-handle");

let camera = new Camera(render);

let sandbox = new Sandbox(camera);


camera.pan(100,100);

document.body.addEventListener("click",e=>{
    let worldPos = sandbox.screenToWorld({x: e.clientX, y: e.clientY});
    let rect = new Bodies.rectangle(worldPos.x,worldPos.y,50,50);
    Composite.add(world, rect);

    const bounds = camera.render.bounds;
    const worldCenter = {
        x: (bounds.min.x + bounds.max.x) / 2,
        y: (bounds.min.y + bounds.max.y) / 2
    };
    console.log("World center:", worldCenter);
    console.log("Clicked world position:", worldPos);

})