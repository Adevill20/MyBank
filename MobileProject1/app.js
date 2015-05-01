document.addEventListener('deviceready', function onDeviceReady() {
    if (navigator && navigator.splashscreen) navigator.splashscreen.hide();
    angular.bootstrap(document, ['ionicApp']);
}, false);

var app = angular.module('ionicApp', ['ionic', 'Orbicular'])
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

.run(function ($rootScope, $interval) {

    $rootScope.hasLoaded = false;

    $rootScope.Nr_of_Absa = 0;
    $rootScope.Nr_of_Nedbank = 0;
    $rootScope.Nr_of_Capitec = 0;
    $rootScope.Nr_of_FNB = 0;
    $rootScope.Nr_of_Stdb = 0;
    $rootScope.Nr_of_blabla = 0;

    $rootScope.TotalServices = 0;

    $rootScope.bankList = [{bankName:"ABSA", bankValue:$rootScope.Nr_of_Absa,},
        {bankName:"Capitec", bankValue: $rootScope.Nr_of_Capitec,},
        {bankName:"FNB", bankValue: $rootScope.Nr_of_FNB,},
        {bankName:"Nedbank", bankValue: $rootScope.Nr_of_Nedbank,},
        {bankName:"Standardbank", bankValue: $rootScope.Nr_of_Stdb,},
        {bankName:"Bla Bla", bankValue: $rootScope.Nr_of_blabla}
    ];

    /*$rootScope.$watch('TotalServices', function ($interval) {
        console.log('Run TotalServices : ' + $rootScope.TotalServices);
    });*/

   // $interval(function ($scope) { console.log('Run Timer TotalServices : ' + $rootScope.TotalServices); }, 1000);
})

.service("MapService", function ($http, $rootScope) {
    return ({
        GetPos: GetPos
    });

    function GetPos() {

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(GotPosition, PosError);
        }
        else {
            console.log('Error : Geolocation is not supported by this browser.');
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
                        $rootScope.Nr_of_Absa++;
                        break;
                    case "First National Bank":
                        $rootScope.Nr_of_FNB++;
                        break;
                    case "Standard Bank":
                        $rootScope.Nr_of_Stdb++;
                        break;
                    case "Nedbank":
                        $rootScope.Nr_of_Nedbank++;
                        break;
                    case "Capitec":
                        $rootScope.Nr_of_Capitec++;
                        break;
                    case "blabla":
                        $rootScope.Nr_of_blabla++;
                        break;
                }
            });
            console.log('Banks Loaded');
            $rootScope.TotalServices = $rootScope.Nr_of_Absa
                + $rootScope.Nr_of_Nedbank
                + $rootScope.Nr_of_Capitec
                + $rootScope.Nr_of_FNB
                + $rootScope.Nr_of_Stdb
                + $rootScope.Nr_of_blabla;
            $rootScope.hasLoaded = true;

            $rootScope.bankList = [{ bankName: "ABSA", bankValue: $rootScope.Nr_of_Absa, },
                { bankName: "Capitec", bankValue: $rootScope.Nr_of_Capitec, },
                { bankName: "FNB", bankValue: $rootScope.Nr_of_FNB, },
                { bankName: "Nedbank", bankValue: $rootScope.Nr_of_Nedbank, },
                { bankName: "Standardbank", bankValue: $rootScope.Nr_of_Stdb, },
                { bankName: "Bla Bla", bankValue: $rootScope.Nr_of_blabla }
            ];
        })
        .error(function (data, status, headers, config) {
            console.log('Error : ' + status);
        });
    }

    function PosError(error) {
        switch (error.code) {
            case error.PERMISSION_DENIED:
                console.log('Error : "User denied the request for Geolocation.');
                break;
            case error.POSITION_UNAVAILABLE:
                console.log('Error : "Location information is unavailable.');
                break;
            case error.TIMEOUT:
                console.log('Error : "The request to get user location timed out.');
                break;
            case error.UNKNOWN_ERROR:
                console.log('Error : "An unknown error occurred.');
                break;
        }
    }

})

.controller('HomeTabCtrl', function ($scope, MapService, $rootScope) {

    MapService.GetPos();

});