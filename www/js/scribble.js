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

    //    $(".floating-integers").html("<p>World Gravity (Y): " + engine.world.gravity.y + "</p><p>X (Gravity): " + xGrav + "</p><p>Y (Gravity): " + yGrav + "</p>")
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
//Initializing vars for internal barriers
//var wall1, wall2, wall3, wall4, wall5, wall6, wall7, wall8, wall9, wall10, wall11;
//var walls = [wall1, wall2, wall3, wall4, wall5]
var walls = []

function setup() {
    var cnv = createCanvas(window.innerWidth, window.innerHeight)
    cnv.parent('p5Container')

    // create an engine
    engine = Engine.create();

    // create two boxes and a ground
    //    boxA = Bodies.rectangle(width / 2, 200, 80, 80);
    //    boxB = Bodies.rectangle(width / 2, 50, 80, 80);
    boxC = Bodies.rectangle(width * .05, height * .05, width * .08, width * .08);
    barrierB = Bodies.rectangle(width / 2, height, width, height / 21, {
        isStatic: true
    });
    barrierT = Bodies.rectangle(width / 2, 0, width, height / 21, {
        isStatic: true
    });
    barrierR = Bodies.rectangle(width, height / 2, height / 21, height, {
        isStatic: true
    });
    barrierL = Bodies.rectangle(0, height / 2, height / 21, height, {
        isStatic: true
    });

    // add all of the bodies to the world
    World.add(engine.world, [boxC, barrierB, barrierT, barrierR, barrierL]);

    //setting up internal barriers
    walls[0] = Bodies.rectangle(width * .3, height * .15, width * .9, height * .05, {
        isStatic: true
    });
    walls[1] = Bodies.rectangle(width * .7, height * .3, width * .9, height * .05, {
        isStatic: true
    });
    walls[2] = Bodies.rectangle(width * .3, height * .43, width * .9, height * .05, {
        isStatic: true
    });
    walls[3] = Bodies.rectangle(width * .7, height * .7, width * .9, height * .05, {
        isStatic: true
    });
    walls[4] = Bodies.rectangle(width * .25, height * .625, height * .05, height * .2, {
        isStatic: true
    });
    walls[5] = Bodies.rectangle(width * .15, height * .925, width * .025, height * .15, {
        isStatic: true
    });
    walls[6] = Bodies.rectangle(width * .3, height * .925, width * .025, height * .15, {
        isStatic: true
    });
    walls[7] = Bodies.rectangle(width * .45, height * .925, width * .025, height * .15, {
        isStatic: true
    });
    walls[8] = Bodies.rectangle(width * .6, height * .925, width * .025, height * .15, {
        isStatic: true
    });
    walls[9] = Bodies.rectangle(width * .75, height * .925, width * .025, height * .15, {
        isStatic: true
    })
    walls[10] = Bodies.rectangle(width * .67, height * .75, width * .025, height * .08, {
        isStatic: true
    })

    World.add(engine.world, walls);

    // run the engine
    Engine.run(engine);
}

// Using p5 to render
function draw() {
    // I could ask for everything in the world
    // var bodies = Composite.allBodies(engine.world);



    background(51);
    noStroke()

    textSize(16);
    fill(50, 125, 250)
    text('Goal!', width * .8, height * .9)
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


    //The Player Box
    var vertices = boxC.vertices;
    beginShape();
    fill(127, 0, 0);
    for (var i = 0; i < vertices.length; i++) {
        vertex(vertices[i].x, vertices[i].y);
    }
    endShape();

    //rendering the barrier walls
    for (var ii = 0; ii < walls.length; ii++) {
        //        console.log("i'm wokring")
        vertices = walls[ii].vertices;
        beginShape();
        fill(127);
        for (var i = 0; i < vertices.length; i++) {
            vertex(vertices[i].x, vertices[i].y);
        }
        endShape();
    }
}
