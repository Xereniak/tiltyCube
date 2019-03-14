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

document.addEventListener("deviceready", init, false);

init()

function init() {
    //    Vars
    var i, coords;

    // Arrays
    var markerCalls = [
        {
            position: {
                lat: 49.6776404,
                lng: -112.8593567
            }
        },
        {
            position: {
                lat: 49.677408,
                lng: -112.860944
            }
        },
        {
            position: {
                lat: 49.677742,
                lng: -112.863450
            }
        }
    ]

    // Start Geolocation Scripts
    var geoOpts = {
        enableHighAccuracy: true
    }

    var watchID, map, marker;


    function geoWin(position) {
        console.log("yes");
        coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        //        Initiation of Google Map API and options
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 14,
            center: coords,
            disableDefaultUI: true
        })

        function markers() {
            markerself = new google.maps.Marker({
                position: coords,
                map: map,
                icon: {
                    path: google.maps.SymbolPath.CIRCLE,
                    scale: 8
                }
            })
            for (i = 0; i < markerCalls.length; i++) {
                var markers = new google.maps.Marker({
                    position: markerCalls[i].position,
                    map: map
                })
            }
        }

        markers()

        navigator.geolocation.watchPosition(watchSuccess, geoLose, geoOpts)

        function watchSuccess(position) {
            coords = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            };
            markerself.setPosition(coords)
            map.setCenter(coords)
        }
        console.log("x = " + position.coords.latitude)
        console.log("y = " + position.coords.longitude)
    }



    function geoLose(m) {
        //        console.log(`Uh oh! We made a little oopsie whoopsie! UwU  ${m}`)
    }

    navigator.geolocation.getCurrentPosition(geoWin, geoLose, geoOpts);

}
