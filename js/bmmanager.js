(function () {

    // TODO: Refactor into two classes (all and favorite) that derive from one common class

    ///////////////////////////////////////////
    // Singleton Pattern
    locabooma.bmmanager = (function () {

            ///////////////////////////////////////////
            // PRIVATE
        function loadBookmarks(filename) {

            var storage = WinJS.Application.local;
            var entries = [];
            storage.exists(filename).then(function (exists) {
                if (exists) {
                    storage.readText(filename, "").then(function (content) {
                        entries = JSON.parse(content);
                    });
                }
            });

            if (entries.length === 0) {
                entries.push(new vm.bookmark("A title1", "desc1"));
                entries.push(new vm.bookmark("B title2", "desc2"));
                entries.push(new vm.bookmark("C title2", "desc2"));
                entries.push(new vm.bookmark("D title2", "desc2"));
                entries.push(new vm.bookmark("R title2", "desc2"));
                entries.push(new vm.bookmark("V title2", "desc2"));
                entries.push(new vm.bookmark("S title2", "desc2"));
                entries.push(new vm.bookmark("S title2", "desc2"));
                entries.push(new vm.bookmark("Z title2", "desc2"));
            }

            return new WinJS.Binding.List(WinJS.Binding.as(entries));
        }

        function saveBookmarks(filename, json) {
            var storage = WinJS.Application.local;
            storage.writeText(filename, json);
        }

        var _allvm = null;
        var _favoritevm = null;

        ///////////////////////////////////////////
        ///////////////////////////////////////////
        function impl() {
            if (impl._instance) {
                throw new Error("not allowed");
            }

            impl._instance = this;
        }

        impl.instance = function () {
            if (impl._instance === null) {
                impl._instance = new impl();
            }

            return impl._instance;
        }

        impl.prototype.loadAll = function () {
            var allBookmarks = loadBookmarks(common.constants.allFile);
            _allvm = new vm.all(allBookmarks);
        }

        impl.prototype.loadFavorites = function () {
            var favoriteBookmarks = loadBookmarks(common.constants.favoritesFile);
        }

        impl.prototype.saveAll = function () {
            var json = JSON.stringify(_allvm.bm);
            saveBookmarks(common.constants.allFile, json);
        }

        impl.prototype.saveFavorites = function () {
            saveBookmarks(common.constants.favoritesFile, JSON.stringify(_favoritevm.bm));
        }

        impl.prototype.all = function () {
            return _allvm;
        }

        impl.prototype.favorites = function () {
            return _favoritevm;
        }

        impl.prototype.addAll = function(bookmark) {
            _allvm.bm.push(bookmark);
        }

        impl.prototype.addFavorite = function (bookmark) {
            _favoritevm.bm.push(bookmark);
        }

        impl._instance = null;

        return impl;
    })();
})();
