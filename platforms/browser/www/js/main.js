var app = new Framework7({
    //    INITIALIZE APP
    root: '#app',

    routes: [
        {
            path: '/page2/',
            url: 'pages/page2.html'
        }
    ]
});

var mainView = app.views.create('.view-main');

var x, y, z, r, g, b

if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", handleOrientation);
} else {
    alert("too bad nerd")
}

function handleOrientation(event) {
    z = event.alpha
    x = event.beta
    y = event.gamma

    $("#x").html("<p>X:" + x + "</p>")
    //    alert("hi")

    r = map(z, 0, 360, 0, 255)
    g = map(x, -90, 90, 0, 255)
    b = map(y, -180, 180, 0, 255)
}

function setup() {
    var cnv = createCanvas(displayWidth, displayHeight)
    cnv.parent('p5Container')
}

function draw() {
    fill(r, g, b)
    $(document).on("click", function (e) {
        //        console.log(e.clientX + " " + e.clientY)
        ellipse(e.clientX, e.clientY, 40, 40)
    })
    //    ellipse(, 50, 160, 80)
}

//console.log($(document).mousedown())
