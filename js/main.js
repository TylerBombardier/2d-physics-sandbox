import Matter from 'matter-js';
import "@material/web/all";
import UIToggle from './components/ui/UIToggle';
import { Camera } from './components/world/Camera';
import { Sandbox } from './components/world/Sandbox';
import { InputController } from './components/input/InputController';

//Destructuring to extract specific modules
const { Engine, Render, Runner, Bodies, World, Composite } = Matter;

let engine = Engine.create(); //Engine creation

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

Render.run(render);
Render.setPixelRatio(render, window.devicePixelRatio); 

let runner = Runner.create();

Runner.run(runner, engine);

//Handles toggling the opening and closing of the UI
let uiToggle = new UIToggle("#left-ui-panel","#ui-handle");

let camera = new Camera(render);

let sandbox = new Sandbox(engine,camera);

let input = new InputController();

function updateGame(){
    let panSpeed = 20;
    let zoomSpeed = 100;

    if (input.isDown("w")) camera.targetY -= panSpeed;
    if (input.isDown("s")) camera.targetY += panSpeed;
    if (input.isDown("a")) camera.targetX -= panSpeed;
    if (input.isDown("d")) camera.targetX += panSpeed;

    let scroll = input.getScroll();
    if (scroll !== 0){
        scroll > 0 ? camera.zoomOut(zoomSpeed) : camera.zoomIn(zoomSpeed);
    }

    if(input.isClicked(0)){
        sandbox.spawnRectangle(input.mousePos, 20, 20);
    }

    camera.update();
    input.endFrame();
}

Matter.Events.on(runner, "afterUpdate", () => {
    updateGame();
})