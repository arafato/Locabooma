(function () {
    WinJS.Namespace.define("vm", {

        bookmark : function(title, description) {
            this.date = Date.now(),
            this.title = title,
            this.description = description,
            this.longitude = 0.0,
            this.latitude = 0.0,
            this.image = ""
        },

        all: function (entries) {
            var self = this;
            this.bookmarks = new WinJS.Binding.List(WinJS.Binding.as(entries));
            
            this.currentBookmark = vm.bookmark();
            this.deleteBookmark = function () {
                var index = self.bookmarks.indexOf(self.currentBookmark());
                self.bookmarks.splice(index, 1);
                self.db.remove(self.currentBookmark().date);
            }
            this.createBookmark = function () {
                var bmark = new vm.bookmark({ title: "New Bookmark", description: "" });
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
            this.saveBookmark = function () {
                self.bookmarks.push(self.currentBookmark());
                $("#overview").trigger("create");
                var date = self.currentBookmark().date;
                var obj = ko.toJSON(self.currentBookmark());
                self.db.set(date, obj, function () { }, function (msg) { alert("Error saving bookmark in storage: " + msg) });
                //window.location = "#overview";
            }
            this.selectBookmark = function (index) {
                this.currentBookmark = this.bookmarks.getAt(index);
            }
            this.takePhoto = function () {
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
            this.launchMap = function () {
                var longitude = self.currentBookmark().longitude();
                var latitude = self.currentBookmark().latitude();
                //window.external.notify("LocationBookmarker.Maps:" + longitude + "," + latitude);
                //navigator.plugins.nativemap.show(function (msg) { }, function (msg) { alert(msg); }, [longitude, latitude]);
            }
        },

        favorites: function (entries) {
            self.bookmarks = ko.observableArray(entries);
        }
    });

    //WinJS.Namespace.define("Sample.ListView", {
    //    data: new WinJS.Binding.List([{ title: "title", description: "descr" }, { title: "title2", description: "descr2" }])
    //});

})();