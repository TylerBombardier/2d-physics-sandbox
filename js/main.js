import Matter from 'matter-js';
import "@material/web/all";
import UIToggle from './components/ui/UIToggle';
import { Camera } from './components/world/Camera';
import { Sandbox } from './components/world/Sandbox';
import { InputController } from './components/input/InputController';

//Destructuring to extract specific modules
const { Engine, Render, Runner, Bodies, World, Composite } = Matter;

let engine = Engine.create(); //Engine creation
let world = engine.world; //World creation

const sceneContainer = document.getElementById("sim-area");
const canvas = document.getElementsByTagName("canvas");
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

let input = new InputController();

document.body.addEventListener("click",e=>{
    if(e.target == canvas[0]){
        let worldPos = sandbox.screenToWorld({x: e.clientX, y: e.clientY});
        let rect = new Bodies.rectangle(worldPos.x,worldPos.y,50,50);
        Composite.add(world, rect);

        const bounds = camera.render.bounds;
        const worldCenter = {
            x: (bounds.min.x + bounds.max.x) / 2,
            y: (bounds.min.y + bounds.max.y) / 2
        };
        console.log("Clicked world position:", worldPos);
    }
})

function updateGame(){
    let panSpeed = 20;
    let zoomSpeed = 50;

    if (input.isDown("w")) camera.targetY -= panSpeed;
    if (input.isDown("s")) camera.targetY += panSpeed;
    if (input.isDown("a")) camera.targetX -= panSpeed;
    if (input.isDown("d")) camera.targetX += panSpeed;

    let scroll = input.getScroll();
    if (scroll !== 0){
        scroll > 0 ? camera.zoomOut(zoomSpeed) : camera.zoomIn(zoomSpeed);
    }

    camera.update();
    input.endFrame();
}

Matter.Events.on(runner, "afterUpdate", () => {
    updateGame();
})