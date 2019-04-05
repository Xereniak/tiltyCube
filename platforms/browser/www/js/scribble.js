//StatusBar.hide()

//Accelerometer setup

var z, x, y;

if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", handleOrientation)
    console.log("started accel")
} else {
    alert("too bad loser")
}

function handleOrientation(e) {
    z = e.alpha
    x = e.beta
    y = e.gamma



    xGrav = map(x, -180, 180, -2, 2)
    yGrav = map(y, -180, 180, -2, 2)

    engine.world.gravity.y = xGrav
    engine.world.gravity.x = yGrav
    //    engine.world.gravity.y = -1

    $(".floating-integers").html("<p>World Gravity (Y): " + engine.world.gravity.y + "</p><p>X (Gravity): " + xGrav + "</p><p>Y (Gravity): " + yGrav + "</p>")
}






//This code is modified from the attributed Daniel Shiffman's examples at the link

// Daniel Shiffman
// Matter.js + p5.js Examples
// This example is based on examples from: http://brm.io/matter-js/


var Engine = Matter.Engine;
var Render = Matter.Render;
var World = Matter.World;
var Bodies = Matter.Bodies;
var Composite = Matter.Composite;

var engine;

var boxA;
var boxB;
var boxC;
var barrierT, barrierR, barrierB, barrierL;

function setup() {
    var cnv = createCanvas(window.innerWidth, window.innerHeight)
    cnv.parent('p5Container')

    // create an engine
    engine = Engine.create();

    // create two boxes and a ground
    boxA = Bodies.rectangle(width / 2, 200, 80, 80);
    boxB = Bodies.rectangle(width / 2, 50, 80, 80);
    boxC = Bodies.rectangle(25, 25, 30, 30);
    barrierB = Bodies.rectangle(width / 2, height, width, height / 21, {
        isStatic: true
    });
    barrierT = Bodies.rectangle(width / 2, 0, width, height / 21, {
        isStatic: true
    });
    barrierR = Bodies.rectangle(width, height / 2, width / 15, height, {
        isStatic: true
    });
    barrierL = Bodies.rectangle(0, height / 2, width / 15, height, {
        isStatic: true
    });

    // add all of the bodies to the world
    World.add(engine.world, [boxA, boxB, boxC, barrierB, barrierT, barrierR, barrierL]);

    // run the engine
    Engine.run(engine);
}

// Using p5 to render
function draw() {
    // I could ask for everything in the world
    // var bodies = Composite.allBodies(engine.world);

    background(51);
    //    noStroke()


    // Ground vertices
    var vertices = barrierB.vertices;
    beginShape();
    fill(127);
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape();

    var vertices = barrierT.vertices;
    beginShape();
    fill(127);
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape();

    var vertices = barrierR.vertices;
    beginShape();
    fill(127);
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape();

    var vertices = barrierL.vertices;
    beginShape();
    fill(127);
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape();


    //An Extra Box
    var vertices = boxC.vertices;
    beginShape();
    fill(127, 0, 0);
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape();
}
