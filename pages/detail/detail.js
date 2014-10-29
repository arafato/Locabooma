(function () {
    WinJS.UI.Pages.define("/pages/detail/detail.html", {
        ready: function (element, options) {
            console.log(options);
            // TODO: bind current bookmark (in options) to view
            // appBar.showOnlyCommands(['detail...']);

            //var button = document.getElementById("showlocmark");
            //button.addEventListener("onclick", function (e) {
                
            //})


            WinJS.Binding.processAll(document.getElementById("detailpage"), options);
        },

        unload: function () {
            console.log("unloading");
        }
    });
})();
