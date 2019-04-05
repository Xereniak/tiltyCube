//var app = new Framework7({
//    //    INITIALIZE APP
//    root: '#app',
//
//    routes: [
//        {
//            path: '/page2/',
//            url: 'pages/page2.html'
//        }
//    ]
//});
//
//var mainView = app.views.create('.view-main');

var x, y, z, r, g, b

StatusBar.hide()

if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", handleOrientation);
} else {
    alert("too bad nerd")
}

function handleOrientation(event) {
    z = event.alpha
    x = event.beta
    y = event.gamma


}

function setup() {
    var cnv = createCanvas(displayWidth, displayHeight)
    cnv.parent('p5Container')
    engine = Engine.create()

    // create two boxes and a ground
    var boxA = Bodies.rectangle(400, 200, 80, 80);
    var boxB = Bodies.rectangle(450, 50, 80, 80);
    var ground = Bodies.rectangle(400, 610, 810, 60, {
        isStatic: true
    });

    // add all of the bodies to the world
    World.add(engine.world, [boxA, boxB, ground]);

    // run the engine
    Engine.run(engine);
}

function draw() {

}

// Setting up the Matter.JS scripts

// module aliases
var Engine = Matter.Engine,
    World = Matter.World,
    Bodies = Matter.Bodies;

// create an engine

// create a renderer
