(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/all.html", {
        // This function is called after the page control contents 
        // have been loaded, controls have been activated, and 
        // the resulting elements have been parented to the DOM. 
        ready: function (element, options) {
            options = options || {};
            var entries = this.loadBookmarks();
            WinJS.Binding.processAll(document.getElementById("all-bookmarks"), new vm.all(entries));
        },

        loadBookmarks: function () {
            return [{ title: "title1", description: "description1" }, { title: "title2", description: "description2" }];
        }
        
    });

    // The following lines expose this control constructor as a global. 
    // This lets you use the control as a declarative control inside the 
    // data-win-control attribute. 

    WinJS.Namespace.define("Locobooma_SectionControls", {
        AllBookmarks: ControlConstructor
    });
})();