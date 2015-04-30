var Nr_of_Absa = 0;
var Nr_of_Nedbank = 0;
var Nr_of_Capitec = 0;
var Nr_of_FNB = 0;
var Nr_of_Stdb = 0;
var Nr_of_blabla = 0;
var TotalServices = 0;

var banklist = [
    {BankName: "ABSA", BankTotal: Nr_of_Absa},
    {BankName: "Capitec", BankTotal: Nr_of_Capitec},
    {BankName: "FNB", BankTotal: Nr_of_FNB},
    {BankName: "Nedbank", BankTotal: Nr_of_Nedbank},
    {BankName: "Standardbank", BankTotal: Nr_of_Stdb},
    {BankName: "Bla Bla", BankTotal: Nr_of_blabla}];

document.addEventListener('deviceready', function onDeviceReady() {
    if (navigator && navigator.splashscreen) navigator.splashscreen.hide();
    angular.bootstrap(document, ['ionicApp']);
}, false);

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

.service("MapService", function ($http, $rootScope) {
    return ({
        Start: Start
    });

    function Start() {
        GetPos();
    }

    function GetPos() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(GotPosition, PosError);
        }
        else {
            error = "Geolocation is not supported by this browser.";
        };
    }

    function GotPosition(position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        var request = $http.get('https://places.demo.api.here.com/places/v1/discover/explore?at=' + latitude + '%2C' + longitude + '&cat=atm-bank-exchange&accept=application%2Fjson&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg')
        .success(function (data, status, headers, config) {
            angular.forEach(data.results.items, function (object) {
                switch (object.title) {
                    case "ABSA":
                        Nr_of_Absa++;
                        break;
                    case "First National Bank":
                        Nr_of_FNB++;
                        break;
                    case "Standard Bank":
                        Nr_of_Stdb++;
                        break;
                    case "Nedbank":
                        Nr_of_Nedbank++;
                        break;
                    case "Capitec":
                        Nr_of_Capitec++;
                        break;
                    case "blabla":
                        Nr_of_blabla++;
                        break;
                }
            });
            console.log('Banks Loaded');
            TotalServices = Nr_of_Absa + Nr_of_Nedbank + Nr_of_Capitec + Nr_of_FNB + Nr_of_Stdb + Nr_of_blabla;
        })
        .error(function (data, status, headers, config) {
            console.log('Error : ' + status);
        });
    }

    function PosError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                error = "User denied the request for Geolocation."
                break;
            case error.POSITION_UNAVAILABLE:
                error = "Location information is unavailable."
                break;
            case error.TIMEOUT:
                error = "The request to get user location timed out."
                break;
            case error.UNKNOWN_ERROR:
                error = "An unknown error occurred."
                break;
        }
    }
    
})

.controller('HomeTabCtrl',function ($scope, MapService) {
    MapService.Start();
    $scope.banks = banklist;
    $scope.TotalServices = TotalServices;
})

.directive('myCustomer', function () {
    return {
        template: function (elem, attr) {
            return '<div round-progress ' +
            ' max="' + TotalServices + '"' +
            ' current="' + attr.total + '"' +
            ' color="#fff"' +
            ' bgcolor=rgba(0,0,0,0.5);' +
            ' radius="25"' +
            ' stroke="5"' +
            ' semi="false"' +
            ' rounded="false"' +
            ' clockwise="true"' +
            ' iterations="50"' +
            ' animation="easeInOutQuart"></div>' ;
        }
    };
});