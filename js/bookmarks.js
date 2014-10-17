(function () {
    WinJS.Namespace.define("vm", {
        bookmark: function (title, description) {
            var self = this;
            // Also serves as ID
            this.date = Date.now();
            this.title = ko.observable(title);
            this.description = ko.observable(description);
            this.longitude = ko.observable(0.0);
            this.latitude = ko.observable(0.0);
            this.image = ko.observable(""); // encoded string
        },

        all: function (entries) {
            var self = this;
            // self.db = storage.storageUnit.instance();
            self.bookmarks = ko.observableArray(entries);
            self.currentBookmark = ko.observable(new bookmark());
            self.deleteBookmark = function () {
                var index = self.bookmarks.indexOf(self.currentBookmark());
                self.bookmarks.splice(index, 1);
                self.db.remove(self.currentBookmark().date);
                //window.location = "#overview";
            }
            self.init = function (entries) {
                this.bookmarks = entries;
            }
            self.createBookmark = function () {
                var bmark = new bookmark("New Bookmark", "");
                //navigator.geolocation.getCurrentPosition(function (position) {
                //    bmark.longitude(position.coords.longitude);
                //    bmark.latitude(position.coords.latitude);
                //},
                //function (error) {
                //    alert('code: ' + error.code + '\n' + 'message: ' + error.message + '\n');
                //});
                self.currentBookmark(bmark);
                return true;
            }
            self.saveBookmark = function () {
                self.bookmarks.push(self.currentBookmark());
                $("#overview").trigger("create");
                var date = self.currentBookmark().date;
                var obj = ko.toJSON(self.currentBookmark());
                self.db.set(date, obj, function () { }, function (msg) { alert("Error saving bookmark in storage: " + msg) });
                //window.location = "#overview";
            }
            self.selectBookmark = function () {
                self.currentBookmark(this);
                return true;
            }
            self.takePhoto = function () {
                //navigator.camera.getPicture(function (imageData) {
                //    var encodedImage = "data:image/jpeg;base64," + imageData;
                //    var image = document.getElementById("image");
                //    image.src = encodedImage;
                //    self.currentBookmark().image(encodedImage);
                //},
                //function (message) {
                //    alert('Failed because: ' + message);
                //},
                //{
                //    quality: 50,
                //    destinationType: Camera.DestinationType.DATA_URL
                //});
            }
            self.launchMap = function () {
                var longitude = self.currentBookmark().longitude();
                var latitude = self.currentBookmark().latitude();
                //window.external.notify("LocationBookmarker.Maps:" + longitude + "," + latitude);
                //navigator.plugins.nativemap.show(function (msg) { }, function (msg) { alert(msg); }, [longitude, latitude]);
            }
        },

        favorites: function (entries) {
            self.bookmarks = ko.observableArray(entries);

            self.init = function (entries) {
                this.bookmarks = entries;
            }
        }
    });
})();