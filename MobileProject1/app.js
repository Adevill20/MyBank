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

var app = angular.module('ionicApp', ['ionic', 'angular-svg-round-progress', 'cordovaGeolocationModule'])
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

.service("MapService", function ($http, $q, $rootScope, cordovaGeolocationService) {
    return ({
        Start: Start
    });

    function Start() {
        GetDetails();
    }

    function GetDetails() {

        cordovaGeolocationService.getCurrentPosition(function (position) {
            alert(
                'Latitude: ' + position.coords.latitude + '\n' +
                'Longitude: ' + position.coords.longitude + '\n' +
                'Altitude: ' + position.coords.altitude + '\n' +
                'Accuracy: ' + position.coords.accuracy + '\n' +
                'Altitude Accuracy: ' + position.coords.altitudeAccuracy + '\n' +
                'Heading: ' + position.coords.heading + '\n' +
                'Speed: ' + position.coords.speed + '\n' +
                'Timestamp: ' + position.timestamp + '\n'
            );
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
        });

        var request = $http.get('https://places.demo.api.here.com/places/v1/discover/explore?at=' + latitude + '%2C' + longitude + '&cat=atm-bank-exchange&accept=application%2Fjson&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg')
        .success(function (data, status, headers, config) {
            angular.forEach(data.results.items, function (object) {
                //if (item.object[0] === 'postal_code') {
                //    zipCode = result.address_components[0].short_name;
                //}
                console.log(object.title + '\n');
            });
        })
        .error(function (data, status, headers, config) {
            console.log('Error : ' + status);
        });
        return (request);
    }
    
})

.controller('HomeTabCtrl', function ($scope, MapService) {
    $scope.banks = banklist;
    MapService.Start();
});

(function () {

    if (window.cordova) {
        // this function is called by Cordova when the application is loaded by the device
        document.addEventListener('deviceready', onDeviceReady, false);
    }

    function onDeviceReady() {
        if (navigator && navigator.splashscreen) navigator.splashscreen.hide();
        //document.addEventListener("online", onOnline, false);
        //document.addEventListener("resume", onResume, false);
        //loadMapsApi();
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
        //console.log('GotLocation: ' + latitude + ' , ' + longitude + '\n');
        //app.MapService.Start();
    }

    function OnFailed(error) {
        alert('code: ' + error.code + '\n' + 'message' + error.message + '\n');
    }
}());