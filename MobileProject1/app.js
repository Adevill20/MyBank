(function (g) {

    var productId = "40af18cea6044ac7956b12a5a95da9ee"; // App unique product key

    // Make analytics available via the window.analytics variable
    // Start analytics by calling window.analytics.Start()
    var analytics = g.analytics = g.analytics || {};
    analytics.Start = function () {
        // Handy shortcuts to the analytics api
        var factory = window.plugins.EqatecAnalytics.Factory;
        var monitor = window.plugins.EqatecAnalytics.Monitor;
        // Create the monitor instance using the unique product key for Analytics
        var settings = factory.CreateSettings(productId);
        settings.LoggingInterface = factory.CreateTraceLogger();
        factory.CreateMonitorWithSettings(settings,
		  function () {
		      console.log("Monitor created");
		      // Start the monitor inside the success-callback
		      monitor.Start(function () {
		          console.log("Monitor started");
		      });
		  },
		  function (msg) {
		      console.log("Error creating monitor: " + msg);
		  });
    }
    analytics.Stop = function () {
        var monitor = window.plugins.EqatecAnalytics.Monitor;
        monitor.Stop();
    }
    analytics.Monitor = function () {
        return window.plugins.EqatecAnalytics.Monitor;
    }
})(window);

(function () {

    
    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app;

    var longitude = 0;
    var latitude = 0;
    var selectedbank = "";

    var Nr_of_Absa = 0;
    var Nr_of_FNB = 0;
    var Nr_of_Stdb = 0;
    var Nr_of_Nedbank = 0;
    var Nr_of_Capitec = 0;
    var BankLat = 0;
    var BankLong = 0;

    var TotalServices = 0;
    var hasLoaded = false;

    var bankList = [{ bankName: "ABSA", bankValue: Nr_of_Absa, },
                        { bankName: "Capitec", bankValue: Nr_of_Capitec, },
                        { bankName: "First National Bank", bankValue: Nr_of_FNB, },
                        { bankName: "Nedbank", bankValue: Nr_of_Nedbank, },
                        { bankName: "Standard bank", bankValue: Nr_of_Stdb, }
    ];

    var MyBankDataSource = new kendo.data.DataSource({ 
        autoSync: true,
        batch: true,
        data: bankList 
    });

    var mySelectedBank = [{
        bank: selectedbank, lat: latitude, long: longitude, banklat: BankLat, banklong: BankLong
    }];

    var SelectedBank = new kendo.data.DataSource({
        autoSync: true,
        batch: true,
        data: mySelectedBank
    });

    SelectedBank.read();

    var services;

    var MyServicesDataSource = new kendo.data.DataSource({
        autoSync: true,
        batch: true,
        data: services
    });

    var watchID = null;

    // create an object to store the models for each view
    window.APP = {
        models: {
            home: {
                title: 'Home',
                ds: MyBankDataSource,
                alert: function (e) {
                    alert(e.data.bankValue);
                },
                onHomeInit: function (e) {
                    app.showLoading();
                    setTimeout(function (e) {
                        app.hideLoading();
                    }, 5000);
                },
                listener: function (e) {
                    APP.models.map.ds._data[0].bank = e.data.bankName;
                    console.log("Bank Selected : " + e.data.bankName);
                    window.plugins.EqatecAnalytics.Monitor.TrackFeature(e.data.bankName);
                    app.navigate("views/services.html");
                },
                tempval: 32
            },
            services: {
                title: 'Services',
                ds: MyServicesDataSource,
                onServicesInit: function (e) {
                    MyServicesDataSource.filter({ field: "title", operator: "eq", value: APP.models.map.ds._data[0].bank });
                    MyServicesDataSource.sync();
                    app.showLoading();
                    setTimeout(function (e) {
                        app.hideLoading();
                    }, 5000);
                },
                listener: function (e) {
                    APP.models.map.ds._data[0].banklat = e.data.position[0];
                    APP.models.map.ds._data[0].banklong = e.data.position[1];
                    console.log("Service Selected : " + e.data.vicinity);
                    window.plugins.EqatecAnalytics.Monitor.TrackFeature(APP.models.map.ds._data[0].bank + "." + e.data.vicinity);
                    app.navigate("views/mapContainer.html");
                }
            },
            map: {
                title: 'Map',
                ds: SelectedBank
            },
        }
    };

    document.addEventListener('pause', function () {
        analytics.Stop();
        if (navigator.geolocation) {
            navigator.geolocation.clearWatch(watchID);
            console.log("Geolocation Watch Stopped");
        }

    }, false);

    document.addEventListener('resume', function () {
        analytics.Start();
        DeviceReady();
    }, false);

    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {

        analytics.Start();
        // hide the splash screen as soon as the app is ready. otherwise
        // Cordova will wait 5 very long seconds to do it for you.
        navigator.splashscreen.hide();

        app = new kendo.mobile.Application(document.body, {

            // you can change the default transition (slide, zoom or fade)
            transition: 'slide',

            // comment out the following line to get a UI which matches the look
            // and feel of the operating system
            skin: 'flat',

            // the application needs to know which view to load first
            initial: 'views/home.html',

            loading: "<h1>Please wait...</h1>"

        });

        DeviceReady();

    }, false);

    function DeviceReady() {
        if (navigator.geolocation) {
            var option1 = { timeout: 30000 };
            watchID = navigator.geolocation.watchPosition(onSuccess, onError, option1);
            console.log("Geolocation Watch Started");
            var options = { maximumAge: 60000, timeout: 10000, enableHighAccuracy: true };
            navigator.geolocation.getCurrentPosition(GotPosition, PosError, options);
        }
        else {
            console.log('Error : Geolocation is not supported by this browser.');
            window.plugins.EqatecAnalytics.Monitor.TrackExceptionMessage("Error", "Error : Geolocation is not supported by this browser.");
        };
    };

    function onSuccess(position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;
        //console.log("Got Longitude : " + longitude);
        //console.log("Got Latitude : " + latitude);
    };

    function GotPosition(position) {
        longitude = position.coords.longitude;
        latitude = position.coords.latitude;

        var mySelectedBank = [{
            bank: selectedbank, lat: latitude, long: longitude
        }];

        SelectedBank.fetch(function () {
            SelectedBank.data(mySelectedBank);
        });
        SelectedBank.sync();

        console.log("Got Longitude : " + longitude);
        console.log("Got Latitude : " + latitude);

        if (!hasLoaded) {
            var request = $.getJSON(
                'http://places.cit.api.here.com/places/v1/discover/explore?at=' + latitude + '%2C' + longitude + '&cat=atm-bank-exchange&accept=application%2Fjson&size=500&app_id=IfyJSN02Memq46mhODA1&app_code=Vr08yzf6VgkrrLr3iTnqJg',
                function (data) {
                    console.log("Total Banks found: " + data.results.items.length);
                    $.each(data.results.items, function (object) {
                        switch (this.title) {
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
                        }
                    });

                    TotalServices = Nr_of_Absa
                    + Nr_of_Nedbank
                    + Nr_of_Capitec
                    + Nr_of_FNB
                    + Nr_of_Stdb

                    bankList = [{ bankName: "ABSA", bankValue: Nr_of_Absa, },
                        { bankName: "Capitec", bankValue: Nr_of_Capitec, },
                        { bankName: "First National Bank", bankValue: Nr_of_FNB, },
                        { bankName: "Nedbank", bankValue: Nr_of_Nedbank, },
                        { bankName: "Standard bank", bankValue: Nr_of_Stdb, }
                    ];

                    MyBankDataSource.fetch(function () {
                        MyBankDataSource.data(bankList);
                    });
                    MyBankDataSource.sync();

                    services = data.results.items;

                    MyServicesDataSource.fetch(function () {
                        MyServicesDataSource.data(services);
                    });
                    MyServicesDataSource.sync();
                })
                .fail(function (jqxhr, textStatus, error) {
                    var err = textStatus + ", " + error;
                    console.log("PLACES API ERROR : " + err);
                    window.plugins.EqatecAnalytics.Monitor.TrackExceptionMessage(err, "PLACES API ERROR");
                });
            hasLoaded = true;
        }
    };

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
                window.plugins.EqatecAnalytics.Monitor.TrackExceptionMessage(error, "Unknown Location Error");
                break;
        }
    };

    function onError(error) {
        alert('code: ' + error.code + '\n' +
              'message: ' + error.message + '\n');
    };

}());