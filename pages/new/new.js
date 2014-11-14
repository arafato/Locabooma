(function () {
    WinJS.UI.Pages.define("/pages/new/new.html", {
        ready: function (element, options) {

            var appBar = document.getElementById("appbar").winControl;
            appBar.showOnlyCommands([common.constants.appBarSaveId]);

            var model = WinJS.Binding.as(new vm.new(0, 0, ""));

            this.updateLocation(model);

            this.setupEventHandlers(model);

            WinJS.Binding.processAll(document.getElementById("bookmarkpage"), model);
        },

        setupEventHandlers: function (model) {
            var refreshBtn = document.getElementById("refreshButton");
            refreshBtn.addEventListener("click", function () {
                this.updateLocation(model);
            }.bind(this));
        },

        unload: function () {
            console.log("unloading");
        },

        updateLocation: function (model) {

            var loc = locabooma.location.instance();
            loc.getCurrentCoords().then(function (pos) {
                model.longitude = pos.longitude;
                model.latitude = pos.latitude;
                model.accuracy = pos.accuracy;
            },
            function (e) {
            })
        }
    });
})();
