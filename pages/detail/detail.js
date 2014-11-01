(function () {
    WinJS.UI.Pages.define("/pages/detail/detail.html", {
        ready: function (element, options) {
            console.log(options);
            // TODO: bind current bookmark (in options) to view
            // appBar.showOnlyCommands(['detail...']);
            
            //button.addEventListener("click", function (e) {
            //    options.print();
            //})

            this.setupEventHandlers(options);

            WinJS.Binding.processAll(document.getElementById("detailpage"), options);
        },

        setupEventHandlers: function(vm) {
            var button = document.getElementById("showlocmark");
            button.addEventListener("click", this.someAction(vm));
        },

        someAction: function(vm) {
            vm.print();
        },

        unload: function () {
            console.log("unloading");
        }
    });
})();
