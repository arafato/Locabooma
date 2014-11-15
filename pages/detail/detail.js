(function () {
    WinJS.UI.Pages.define("/pages/detail/detail.html", {
        ready: function (element, options) {
            console.log(options);
            // TODO: bind current bookmark (in options) to view
            // appBar.showOnlyCommands(['detail...']);
            
            this.setupEventHandlers(options);

            WinJS.Binding.processAll(document.getElementById("detailpage"), options);
        },

        setupEventHandlers: function(vm) {
            
        },

        unload: function () {
            console.log("unloading");
        }
    });
})();
