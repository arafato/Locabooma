(function () {

    // TODO: Refactor into two classes (all and favorite) that derive from one common class

    ///////////////////////////////////////////
    // Singleton Pattern
    locabooma.bmmanager = (function () {

        ///////////////////////////////////////////
        // PRIVATE

        function unwrap(bindingList) {
            var newList = [];
            for (var i = 0; i < bindingList.length; i++) {
                newList.push(WinJS.Binding.unwrap(bindingList.getAt(i)));
            }

            return newList;
        };

        function loadBookmarks(filename) {

            return new WinJS.Promise(function (complete, error, progres) {
                var storage = WinJS.Application.local;
                var entries = [];
                storage.exists(filename).done(function (exists) {
                    if (exists) {
                        storage.readText(filename, "failed").done(function (content) {
                            entries = JSON.parse(content);
                            complete(entries);
                        });
                    }
                });
            });

        }

        function saveBookmarks(filename, list) {
            var storage = WinJS.Application.local;
            var content = JSON.stringify(unwrap(list));
            storage.writeText(filename, content);
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
            loadBookmarks(common.constants.allFile).then(function (bookmarks) {
                _allvm = new vm.all(bookmarks);
            })

        }

        impl.prototype.loadFavorites = function () {
            throw new Error("Not implemented yet.");
        }

        impl.prototype.saveAll = function () {
            saveBookmarks(common.constants.allFile, _allvm.bm);
        }

        impl.prototype.saveFavorites = function () {
            saveBookmarks(common.constants.favoritesFile, _favoritevm.bm);
        }

        impl.prototype.all = function () {
            return _allvm;
        }

        impl.prototype.favorites = function () {
            return _favoritevm;
        }

        impl.prototype.addAll = function (bookmark) {
            _allvm.bm.push(bookmark);
        }

        impl.prototype.addFavorite = function (bookmark) {
            _favoritevm.bm.push(bookmark);
        }

        impl._instance = null;

        return impl;
    })();
})();
