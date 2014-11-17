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

            var storage = WinJS.Application.local;
            var entries = [];
            storage.exists(filename).then(function (exists) {
                if (exists) {
                    storage.readText(filename, "failed").then(function (content) {
                        entries = JSON.parse(content);
                    });
                }
            });

            if (!entries) {
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

            return entries;
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
            var allBookmarks = loadBookmarks(common.constants.allFile);
            _allvm = new vm.all(allBookmarks);
        }

        impl.prototype.loadFavorites = function () {
            var favoriteBookmarks = loadBookmarks(common.constants.favoritesFile);
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
