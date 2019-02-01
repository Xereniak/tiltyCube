var app = new Framework7({
    //    INITIALIZE APP
    root: '#app',

    //    PANEL RULES
    panel: {
        swipe: 'both',
        swipeActiveArea: 50,
    },
    //    PAGE RULES
    routes: [
        {
            path: '/page2/',
            url: 'pages/page2.html'
        }
    ],
});

var mainView = app.views.create('.view-main');
