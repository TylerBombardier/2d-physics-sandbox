import Matter from 'matter-js';

//Destructuring to extract specific modules
const { Engine, Render, Runner, Bodies, World, Composite } = Matter;

let engine = Engine.create(); //Engine creation
let world = engine.world; //World creation

/**
 * Creating the PIXI canvas
 */
let sceneContainer = document.getElementById("sim-area");
let bounds = sceneContainer.getBoundingClientRect();

let render = Render.create({
  element: sceneContainer,
  engine: engine,
  options: {
    width: bounds.width,
    height: bounds.height,
    wireframes: false,
    background: 'transparent',
  }
});

// create two boxes and a ground
var boxA = Bodies.rectangle(400, 200, 80, 80);
var boxB = Bodies.rectangle(450, 50, 80, 80);
var ground = Bodies.rectangle(window.innerWidth/2, window.innerHeight+25, window.innerWidth, 50, { isStatic: true });

// add all of the bodies to the world
Composite.add(engine.world, [boxA, boxB, ground]);

Render.run(render);
Render.setPixelRatio(render, window.devicePixelRatio); 

let runner = Runner.create();

Runner.run(runner, engine);