(function () {

    // store a reference to the application object that will be created
    // later on so that we can use it if need be
    var app;

    var longitude;
    var latitude;

    var Nr_of_Absa = 0;
    var Nr_of_FNB = 0;
    var Nr_of_Stdb = 0;
    var Nr_of_Nedbank = 0;
    var Nr_of_Capitec = 0;
    var Nr_of_blabla = 0;

    var TotalServices = 0;
    var hasLoaded = false;

    var bankList = [{ bankName: "ABSA", bankValue: Nr_of_Absa, },
                        { bankName: "Capitec", bankValue: Nr_of_Capitec, },
                        { bankName: "FNB", bankValue: Nr_of_FNB, },
                        { bankName: "Nedbank", bankValue: Nr_of_Nedbank, },
                        { bankName: "Standardbank", bankValue: Nr_of_Stdb, },
                        { bankName: "Bla Bla", bankValue: Nr_of_blabla }
    ];

    var MyBankDataSource = new kendo.data.DataSource({ 
        autoSync: true,
        batch: true,
        data: bankList 
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
                }
            },
            services: {
                title: 'Services',
                ds: MyBankDataSource,
                alert: function (e) {
                    alert(e.data.bankValue);
                },
                onInit: function (e) {
                    app.showLoading();
                    setTimeout(function (e) {
                        app.hideLoading();
                    }, 5000);
                }
            },
            contacts: {
                title: 'Contacts',
                ds: new kendo.data.DataSource({
                    data: [{ id: 1, name: 'Bob' }, { id: 2, name: 'Mary' }, { id: 3, name: 'John' }]
                }),
                alert: function (e) {
                    alert(e.data.name);
                }
            },
            map: {
                title: 'Map',
            }
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

        console.log("Got Longitude : " + longitude + "\n");
        console.log("Got Latitude : " + latitude);

        if (!hasLoaded) {

            var request = $.getJSON(
                'https://places.demo.api.here.com/places/v1/discover/explore?at=' + latitude + '%2C' + longitude + '&cat=atm-bank-exchange&accept=application%2Fjson&app_id=DemoAppId01082013GAL&app_code=AJKnXv84fjrb0KIHawS0Tg',
                function (data) {
                    console.log("success");
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
                            case "blabla":
                                Nr_of_blabla++;
                                break;
                        }
                    });


                    TotalServices = Nr_of_Absa
                    + Nr_of_Nedbank
                    + Nr_of_Capitec
                    + Nr_of_FNB
                    + Nr_of_Stdb
                    + Nr_of_blabla;

                    bankList = [{ bankName: "ABSA", bankValue: Nr_of_Absa, },
                        { bankName: "Capitec", bankValue: Nr_of_Capitec, },
                        { bankName: "FNB", bankValue: Nr_of_FNB, },
                        { bankName: "Nedbank", bankValue: Nr_of_Nedbank, },
                        { bankName: "Standardbank", bankValue: Nr_of_Stdb, },
                        { bankName: "Bla Bla", bankValue: Nr_of_blabla }
                    ];

                    MyBankDataSource.fetch(function () {
                        MyBankDataSource.data(bankList);
                    });
                    MyBankDataSource.sync(); 
                    //APP.models.settings.ds.read();

                    /*$("#bankListView").kendoMobileListView({
                        dataSource: ({ data: bankList }),
                        template: kendo.template($("#settingsTemplate").html()),
                        alert: function (e) {
                            alert(e.data.bankValue);
                        }
                });*/

                    //var listView = $("#bankListView").data("kendoMobileListView");
                    // refreshes the list view
                    //listView.refresh();
                    //listView.setDataSource(MyBankDataSource);
                })
                //.done(function () {
                //console.log("second success");
                //})
                .fail(function () {
                    console.log("error");
                });
                //.always(function () {
                //console.log("complete");
           // });
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