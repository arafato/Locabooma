(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/all.html", {
        ready: function (element, options) {
            options = options || {};

            var entries = this.loadBookmarks();
            // Maybe a singelton approach is better...
            var allvm = new vm.all(entries);

            var listView = element.querySelector('#listview').winControl;
            function itemInvokedHandler(eventObject) {
                eventObject.detail.itemPromise.done(function (i) {
                    allvm.selectBookmark(i.index);
                    // TODO: Navigate to detail view
                });
            }

            listView.addEventListener("iteminvoked", itemInvokedHandler, false);

            WinJS.Binding.processAll(document.getElementById("all-bookmarks"), allvm);


        },

        loadBookmarks: function () {
            var entries = [];
            entries.push(new vm.bookmark("title1", "desc1"));
            entries.push(new vm.bookmark("title2", "desc2"));
            return entries;
        },
    });

    // The following lines expose this control constructor as a global. 
    // This lets you use the control as a declarative control inside the 
    // data-win-control attribute. 

    WinJS.Namespace.define("Locobooma_SectionControls", {
        AllBookmarks: ControlConstructor
    });
})();