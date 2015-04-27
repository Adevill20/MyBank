(function () {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app = {
        models: {},
        data: {}
    };

    if (window.cordova) {
        // this function is called by Cordova when the application is loaded by the device
        document.addEventListener('deviceready', function () {

            // hide the splash screen as soon as the app is ready. otherwise
            // Cordova will wait 5 very long seconds to do it for you.
            if (navigator && navigator.splashscreen) navigator.splashscreen.hide();

        }, false);
    }
    window.app = app;
}());

angular.module('ionicApp', ['ionic', 'angular-svg-round-progress'])
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(5);
    $ionicConfigProvider.views.transition("ios");
    $ionicConfigProvider.backButton.icon("ion-chevron-left");
    $ionicConfigProvider.navBar.alignTitle("center");
    $ionicConfigProvider.navBar.positionPrimaryButtons("left");

    $stateProvider
      .state('main', {
          url: "/main",
          abstract: true,
          templateUrl: "templates/main.html"
      })
      .state('main.home', {
          url: "/home",
          views: {
              'home-tab': {
                  templateUrl: "templates/home.html",
                  controller: 'HomeTabCtrl'
              }
          }
      })
      .state('main.facts', {
          url: "/facts",
          views: {
              'home-tab': {
                  templateUrl: "templates/facts.html"
              }
          }
      })
      .state('main.facts2', {
          url: "/facts2",
          views: {
              'home-tab': {
                  templateUrl: "templates/facts2.html"
              }
          }
      })
    .state('main.map_view', {
        url: "/map_view",
        views: {
            'home-tab': {
                templateUrl: "templates/map_view.html"
            }
        }
    });

})

.controller('HomeTabCtrl', function ($scope) {
    //console.log('HomeTabCtrl');
});
