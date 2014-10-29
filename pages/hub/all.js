(function () {
    "use strict";

    var ControlConstructor = WinJS.UI.Pages.define("/pages/hub/all.html", {
        ready: function (element, options) {
            options = options || {};

            var entries = this.loadBookmarks();
            // Maybe a singelton approach is better...
            var allvm = new vm.all(entries);

            var listViewZi = element.querySelector('#listview-zoomedin').winControl;
            listViewZi.itemDataSource = allvm.bookmarks.dataSource;
            listViewZi.groupDataSource = allvm.bookmarks.groups.dataSource;

            var listViewZo = element.querySelector('#listview-zoomedout').winControl;
            listViewZo.itemDataSource = allvm.bookmarks.groups.dataSource;

            function itemInvokedHandler(eventObject) {
                eventObject.detail.itemPromise.done(function (i) {
                    allvm.selectBookmark(i.index);
                    WinJS.Navigation.navigate("pages/detail/detail.html", allvm.currentBookmark);
                });
            }

            listViewZi.addEventListener("iteminvoked", itemInvokedHandler, false);

            WinJS.Binding.processAll(document.getElementById("all-bookmarks"), allvm);


        },

        loadBookmarks: function () {
            var entries = [];
            entries.push(new vm.bookmark("A title1", "desc1"));
            entries.push(new vm.bookmark("B title2", "desc2"));
            entries.push(new vm.bookmark("C title2", "desc2"));
            entries.push(new vm.bookmark("D title2", "desc2"));
            entries.push(new vm.bookmark("R title2", "desc2"));
            entries.push(new vm.bookmark("V title2", "desc2"));
            entries.push(new vm.bookmark("S title2", "desc2"));
            entries.push(new vm.bookmark("S title2", "desc2"));
            entries.push(new vm.bookmark("Z title2", "desc2"));
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