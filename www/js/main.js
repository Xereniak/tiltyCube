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
    var i, coords, watchID, map, marker, typeTrap;

    var geoOpts = {
        enableHighAccuracy: true
    }

    // Arrays
    var markerCalls = [
        {
            position: {
                lat: 49.6776404,
                lng: -112.8593567
            },
            markerType: "help"
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
        },
        {
            position: {
                lat: 49.5025,
                lng: -112.5217
            }
        }
    ]
    var markerType = [
        "help",
        "bomb",
        "help",
        "bomb"
    ]
    // Start Geolocation Scripts


    function watchSuccess(position) {
        coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        markerself.setPosition(coords)
        map.setCenter(coords)
    }


    function geoLose(m) {
        //        console.log(`Uh oh! We made a little oopsie whoopsie! UwU  ${m}`)
    }


    function geoWin(position) {
        coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
        };
        //        Initiation of Google Map API and options
        map = new google.maps.Map(document.getElementById('map'), {
            zoom: 18,
            center: coords,
            disableDefaultUI: true,
            clickableIcons: false,
            gestureHandling: "none"
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
        triangulate(position)

        navigator.geolocation.watchPosition(watchSuccess, geoLose, geoOpts)
    }

    navigator.geolocation.getCurrentPosition(geoWin, geoLose, geoOpts);

    function triangulate(position) {
        console.log("I am here")
        for (i = 0; i < markerCalls.length; i++) {
            var A = markerCalls[i].position.lat - position.coords.latitude;
            var B = markerCalls[i].position.lng - position.coords.longitude;
            var C2 = A * A + B * B;
            var C = Math.sqrt(C2)
            var lats = Math.sqrt(position.coords.latitude * position.coords.latitude + markerCalls[i].position.lat * markerCalls[i].position.lat)
            console.log(C)

            if (C < 0.0004) {
                typeTrap = i
                return typeTrap
            }
        }
    }
}
