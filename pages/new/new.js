(function () {

    var appBar = document.getElementById("appbar").winControl;
    var bmmanager = locabooma.bmmanager.instance();

    WinJS.UI.Pages.define("/pages/new/new.html", {
        ready: function (element, options) {

            appBar.showOnlyCommands([common.constants.appBarSaveId]);

            var model = WinJS.Binding.as(new vm.bookmark("Title", "Description"));
            this.updateCoordinates(model);
            this.setupEventHandlers(model);

            WinJS.Binding.processAll(document.getElementById("bookmarkpage"), model);
        },

        setupEventHandlers: function (model) {
            var refreshBtn = document.getElementById("refreshButton");
            refreshBtn.addEventListener("click", function () {
                this.updateCoordinates(model);
            }.bind(this));

            var abSave = document.getElementById(common.constants.appBarSaveId);
            abSave.addEventListener("click", function () {
                // TODO: By default there is no 2-way binding in WinJS. We need to grab the UI data
                // and save it in the model manually before we add it ti the collection.

                bmmanager.addAll(model);
                bmmanager.saveAll();
            })
        },

        unload: function () {
            console.log("unloading");
        },

        updateCoordinates: function (model) {

            var loc = locabooma.location.instance();
            loc.getCurrentCoords().then(function (pos) {
                model.longitude = pos.longitude;
                model.latitude = pos.latitude;
                this.updateLocation(model);
            }.bind(this),
            function (e) {
            })
        },

        updateLocation: function (model) {
            var loc = locabooma.location.instance();
            loc.getLocation(model).then(function (location) {
                if (location.locations.size > 0) {
                    var town = location.locations[0].address.town;
                    var country = location.locations[0].address.country;
                    var street = location.locations[0].address.street;
                    var streetNumber = location.locations[0].address.streetNumber;

                    var address = [];
                    if (town) address.push(town);
                    if (country) address.push(country);
                    if (street) address.push(street + streetNumber);
                    
                    model.location = address.join(",");
                    model.country = country;
                    model.town = town;
                    model.street = street;
                    model.streetNumber = streetNumber;
                    return;
                }

                model.location = "N/A";
            })
        }
    });
})();
