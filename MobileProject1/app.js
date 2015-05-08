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
        bank: selectedbank, lat: latitude, long: longitude
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
                }
            },
            map: {
                title: 'Map',
                ds: SelectedBank
            },
        }
    };

    // this function is called by Cordova when the application is loaded by the device
    document.addEventListener('deviceready', function () {

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
            navigator.geolocation.getCurrentPosition(GotPosition, PosError);
        }
        else {
            console.log('Error : Geolocation is not supported by this browser.');
        };
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
                'http://places.cit.api.here.com/places/v1/discover/explore?at=' + latitude + '%2C' + longitude + '&cat=atm-bank-exchange&accept=application%2Fjson&size=500&app_id=mLJYk4GmHooykP8vSwER&app_code=XJ6-QI0pqxm9I-R0-EB5yw',
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
                .fail(function () {
                    console.log("error");
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
                break;
        }
    };

}());