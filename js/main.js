import Matter from 'matter-js';
import "@material/web/all";
import UIToggle from './ui/UIToggle';
import { Camera } from './domain/Camera';
import { Sandbox } from './domain/Sandbox';
import { InputController } from './controllers/InputController';
import { GrabTool } from './tools/GrabTool';
import { ColorTool } from './tools/ColorTool';
import { EraserTool } from './tools/EraserTool';
import { ToolOptionsController } from './controllers/ToolOptionsController';
import { ToolController } from './controllers/ToolController';
import { ToolBar } from './ui/ToolBar';

//Destructuring to extract specific modules
const { Engine, Render, Runner, Bodies, World, Composite, MouseConstraint, Mouse} = Matter;

const sceneContainer = document.getElementById("sim-area");
const canvas = document.getElementsByTagName("canvas");
const bounds = sceneContainer.getBoundingClientRect();
const arrow = document.getElementById("arrow");

let engine = Engine.create();

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

let input = new InputController();

let camera = new Camera(render);

let sandbox = new Sandbox(engine,camera);

let toolController = new ToolController();

let grabTool = new GrabTool(engine,render,input);
let colorTool = new ColorTool(engine,render,input,sandbox);
let eraserTool = new EraserTool(engine,render,input,sandbox);

toolController.register("grab", grabTool);
toolController.register("color", colorTool);
toolController.register("eraser", eraserTool);

for(let i = 0; i < 10; i++){
    sandbox.spawnRectangle({x: 100, y: 100},100,100);
}

sandbox.spawnBarriers();

// This function is called for every simulation frame
function updateGame(){
    let panSpeed = 20;
    let zoomSpeed = 100;

    if (input.isDown("KeyW")) camera.targetY -= panSpeed;
    if (input.isDown("KeyS")) camera.targetY += panSpeed;
    if (input.isDown("KeyA")) camera.targetX -= panSpeed;
    if (input.isDown("KeyD")) camera.targetX += panSpeed;

    let scroll = input.getScroll();
    if (scroll !== 0){
        scroll > 0 ? camera.zoomOut(zoomSpeed) : camera.zoomIn(zoomSpeed);
    }

    camera.update();

    toolController.update();

    input.endFrame();
}

Matter.Events.on(runner, "afterUpdate", () => {
    updateGame();
})


// Event Listeners for the User Interface

document.addEventListener("DOMContentLoaded",b=>{
    let toolOptionsController = new ToolOptionsController("ui-tool-options");

    let toolBar = new ToolBar(toolController,toolOptionsController);
    
    let uiToggle = new UIToggle("#left-ui-panel","#ui-handle");

})

