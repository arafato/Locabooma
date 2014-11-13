(function () {
    WinJS.UI.Pages.define("/pages/new/new.html", {
        ready: function (element, options) {

            var appBar = document.getElementById("appbar").winControl;
            appBar.showOnlyCommands([common.constants.appBarSaveId]);

            var loc = locabooma.location.instance();

            loc.getCurrentCoords().then(function (pos) {
                var l = pos.longitude;
            },
            function (e) {
            })

            this.setupEventHandlers(options);

            WinJS.Binding.processAll(document.getElementById("bookmarkpage"), options);
        },

        setupEventHandlers: function (vm) {
            
        },

        unload: function () {
            console.log("unloading");
        }
    });
})();
