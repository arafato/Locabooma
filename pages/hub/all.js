(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/all.html", {
        ready: function (element, options) {
            options = options || {};

            var allvm = locabooma.bmmanager.instance().all();
            //var entries = this.loadBookmarks();
            //var allvm = new vm.all(entries);


            this.setup(allvm, element, options);
            
            WinJS.Binding.processAll(document.getElementById("all-bookmarks"), allvm);
        },

        setup: function (allvm, element, options) {
            var listViewZi = element.querySelector('#listview-zoomedin').winControl;
            listViewZi.itemDataSource = allvm.bookmarks.dataSource;
            listViewZi.groupDataSource = allvm.bookmarks.groups.dataSource;

            var listViewZo = element.querySelector('#listview-zoomedout').winControl;
            listViewZo.itemDataSource = allvm.bookmarks.groups.dataSource;

            function itemInvokedHandler(eventObject) {
                eventObject.detail.itemPromise.done(function (i) {
                    allvm.selectBookmark(i.index);
                    WinJS.Navigation.navigate("pages/detail/detail.html", allvm);
                });
            }

            listViewZi.addEventListener("iteminvoked", itemInvokedHandler, false);
        }
    });

    // The following lines expose this control constructor as a global. 
    // This lets you use the control as a declarative control inside the 
    // data-win-control attribute. 

    WinJS.Namespace.define("Locobooma_SectionControls", {
        AllBookmarks: ControlConstructor
    });
})();