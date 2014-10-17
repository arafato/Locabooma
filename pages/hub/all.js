(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/all.html", {
        // This function is called after the page control contents 
        // have been loaded, controls have been activated, and 
        // the resulting elements have been parented to the DOM. 
        ready: function (element, options) {
            options = options || {};
            ko.applyBindings(new vm.all([], document.getElementById("all-bookmarks")));
        },
    });

    // The following lines expose this control constructor as a global. 
    // This lets you use the control as a declarative control inside the 
    // data-win-control attribute. 

    WinJS.Namespace.define("Locobooma_SectionControls", {
        AllBookmarks: ControlConstructor
    });
})();