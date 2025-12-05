import Matter from 'matter-js';
import "@material/web/all";
import UIToggle from './components/ui/UIToggle';
import { Camera } from './components/world/Camera';
import { Sandbox } from './components/world/Sandbox';
import { InputController } from './components/input/InputController';
import { GrabTool } from './components/tools/GrabTool';
import { ToolManager } from './components/tools/ToolManager';

//Destructuring to extract specific modules
const { Engine, Render, Runner, Bodies, World, Composite, MouseConstraint, Mouse} = Matter;

let engine = Engine.create(); //Engine creation

const sceneContainer = document.getElementById("sim-area");
const canvas = document.getElementsByTagName("canvas");
const bounds = sceneContainer.getBoundingClientRect();
const handle = document.getElementById("ui-handle");
const arrow = document.getElementById("arrow");

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

let mouseConstraint = MouseConstraint.create(engine, {
        mouse: Mouse.create(render.canvas),
        constraint: {
            stiffness: 0.2,
            render: {
                visible: false
            }
        }
    });

Render.run(render);
Render.setPixelRatio(render, window.devicePixelRatio); 

let runner = Runner.create();

Runner.run(runner, engine);

let input = new InputController();

//Handles toggling the opening and closing of the UI
let uiToggle = new UIToggle("#left-ui-panel","#ui-handle");

let camera = new Camera(render);

let sandbox = new Sandbox(engine,camera);

sandbox.spawnRectangle({x: 100, y: 100},100,100);

let toolManager = new ToolManager();

let grabTool = new GrabTool(mouseConstraint);

toolManager.registerTool("grab", grabTool);
toolManager.setTool("grab");

sandbox.spawnBarriers();

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

    if(input.isClicked(0)){

    }

    if(arrow.closest("div") == handle){
        if(uiToggle.isOpen){
            document.getElementById("arrow").innerHTML = "arrow_menu_close";
        } else {
            document.getElementById("arrow").innerHTML = "arrow_menu_open";
        }
        
    }

    let tool = toolManager.getActiveTool();

    if (input.isClicked(0))  tool?.onClick();
    if (input.isDown(0))     tool?.onDrag();

    camera.update();
    input.endFrame();
}

Matter.Events.on(runner, "afterUpdate", () => {
    updateGame();
})