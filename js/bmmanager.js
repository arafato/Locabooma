(function () {
    ///////////////////////////////////////////
    // Singleton Pattern
    var bmmanager = (function () {

        ///////////////////////////////////////////
        // PRIVATE
        function loadBookmarks(filename) {

            var storage = WinJS.Application.local;
            var entries = [];
            if (storage.exists(filename)) {
                storage.readText(filename, "").then(function (content) {
                    entries = JSON.parse(content);
                })
            }

            return entries;
        }

        function saveBookmarks(filename, json) {
            var storage = WinJS.Application.local;
            storage.writeText(filename, json);
        }

        ///////////////////////////////////////////
        ///////////////////////////////////////////
        function impl() {
            if (impl._instance) {
                throw new Error("not allowed");
            }

            this.allBookmarks = null;
            this.favoriteBookmarks = null;

            impl._instance = this;
        }

        impl.getInstance() = function () {
            if (impl._instance === null) {
                impl._instance = new impl();
            }

            return impl._instance;
        }

        impl.prototype.loadAll = function () {
            this.allBookmarks = loadBookmarks(common.constants.allFile);
        }

        impl.prototype.loadFavorites = function () {
            this.favoriteBookmarks = loadBookmarks(common.constants.favoritesFile);
        }

        impl.prototype.saveAll = function () {
            saveBookmarks(common.constants.allFile, JSON.stringify(this.allBookmarks));
        }

        impl.prototype.saveFavorites = function () {
            saveBookmarks(common.constants.favoritesFile, JSON.stringify(this.favoriteBookmarks));
        }

        impl.prototype.all = function () {
            return this.allBookmarks;
        }

        impl.prototype.favorites = function () {
            return this.favoriteBookmarks;
        }

        impl._instance = null;

        return impl;
    })();
})();
