import * as PIXI from 'pixi.js';
import Matter from 'matter-js';

//Destructuring to extract specific modules
const { Engine, Render, Runner, Bodies, World } = Matter;
const { Application } = PIXI;

let engine = Engine.create(); //Engine creation
let world = engine.world; //World creation

/**
 * Creating the PIXI canvas
 */
let container = document.getElementById("sim-area");
let bounds = container.getBoundingClientRect();

const app = new Application();
await app.init({
    width: bounds.width,
    height: bounds.height,
    backgroundColor: new PIXI.Color('white'),
    antialias: true,
    resolution: 1,
    preference: 'webgl'
})

container.appendChild(app.canvas);