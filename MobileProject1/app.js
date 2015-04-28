var longitude;
var latitude;
var banklist = {
    "ABSA": "2",
    "Capitec": "2",
    "FNB": "3",
    "Nedbank": "1",
    "Standardbank": "3",
    "Bla Bla": "2"
};

var app = angular.module('ionicApp', ['ionic', 'angular-svg-round-progress'])
.config(function ($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
    $ionicConfigProvider.views.maxCache(0);
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

    $urlRouterProvider.otherwise("/main/home");

})

.service("MapService", function ($http, $q) {
    return ({
        test1: test1
    });


    function test1() {
        var request = $http.get('http://places.cit.api.here.com/places/v1/discover/search?at=52.5310%2C13.3848&q=Italian+pizza&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg')
        .success(function (data, status, headers, config) {
            console.log('GotAJAX: ' + data);
            // this callback will be called asynchronously
            // when the response is available
        })
        .error(function (data, status, headers, config) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
        return (request.then(handleSuccess, handleError));
    }

    function handleSuccess(response) {
        console.log('GotAJAX: ' + response.data);
        return (response.data);
    }

    function handleError(response) {

        // The API response from the server should be returned in a
        // nomralized format. However, if the request was not handled by the
        // server (or what not handles properly - ex. server error), then we
        // may have to normalize it on our end, as best we can.
        if (
            !angular.isObject(response.data) ||
            !response.data.message
            ) {

            return ($q.reject("An unknown error occurred."));
        }

        // Otherwise, use expected error message.
        return ($q.reject(response.data.message));
    }
})

.controller('HomeTabCtrl', function ($scope, MapService) {
    $scope.banks = banklist;
    MapService.test1();
    //console.log('HomeTabCtrl');
});

(function () {

    function onDeviceReady() {
        if (navigator && navigator.splashscreen) navigator.splashscreen.hide();
        document.addEventListener("online", onOnline, false);
        document.addEventListener("resume", onResume, false);
        loadMapsApi();
    }

    function onOnline() {
        loadMapsApi();
    }

    function onResume() {
        loadMapsApi();
    }

    function loadMapsApi() {
        if (navigator.connection.type === Connection.NONE) {
            return;
        }
        navigator.geolocation.getCurrentPosition(OnGotLocation, OnFailed);
    }

    function OnGotLocation(position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        console.log('GotLocation: ' + longitude + ' , ' + latitude + '\n');
    }

    function OnFailed(error) {
        alert('code: ' + error.code + '\n' + 'message' + error.message + '\n');
    }

    if (window.cordova) {
        // this function is called by Cordova when the application is loaded by the device
        document.addEventListener('deviceready', onDeviceReady, false);
    }
}());