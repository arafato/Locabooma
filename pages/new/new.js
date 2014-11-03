(function () {
    WinJS.UI.Pages.define("/pages/new/new.html", {
        ready: function (element, options) {
            
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
