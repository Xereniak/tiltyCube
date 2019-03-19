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
    var i, coords, watchID, map, marker, typeTrap, userPoints;
    userPoints = 263;
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
            markerType: "help",
            message: "Good luck hunting! I would put in a feature to let you make your own waypoints too, but I'm a dumb dumb that thought 4 writing/project classes would be smart to take together ;w;"
        },
        {
            position: {
                lat: 49.677408,
                lng: -112.860944
            },
            markerType: "bomb",
            message: "People can leave somewhat less helpful enounters as well~    Well, I can anyway."
        },
        {
            position: {
                lat: 49.677742,
                lng: -112.863450
            },
            markerType: "help",
            message: "I would advise you to stop searching for any more points, as this is the farthest away. Unless you travel all the way to Stirling AB..."
        },
        {
            position: {
                lat: 49.5025,
                lng: -112.5217
            },
            markerType: "bomb",
            message: "You either did something wild by opening this app waaaaaaay out in Stirling, or you cheated. God is watching."
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
            zoom: 16,
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
        for (i = 0; i < markerCalls.length; i++) {
            if (markerCalls[i].position != null) {
                var A = markerCalls[i].position.lat - position.coords.latitude;
                var B = markerCalls[i].position.lng - position.coords.longitude;
                var C2 = A * A + B * B;
                var C = Math.sqrt(C2)
                var lats = Math.sqrt(position.coords.latitude * position.coords.latitude + markerCalls[i].position.lat * markerCalls[i].position.lat)
                // Adjust If statement back to .0004 range before build
                if (C < 0.0004) {
                    typeTrap = i
                    executeWay(i)
                    return typeTrap
                }
            }

        }
    }

    function executeWay(typeTrap) {
        console.log("success")
        markerCalls[i].position = null;
        console.log(markerCalls[i].position)
        console.log(markerCalls[i].markerType)
        if (markerCalls[i].markerType == "bomb") {
            userPoints -= 40
            alert(`This one exploded! You lost 40 points! ${userPoints} remaining. The author left a message... "${markerCalls[i].message}"`)
        } else if (markerCalls[i].markerType == "help") {
            userPoints += 15
            alert(`This one help you! You gain 15 points! ${userPoints} remaining. The author left a message... "${markerCalls[i].message}"`)
        }
    }


    // Making the points viewable from page two, which has no link
    Dom7(document).on('page:init', '.page[data-name="page2"]', function (e) {
        $("#points-container").html(`<p>${userPoints}</p>`)
    });
}
