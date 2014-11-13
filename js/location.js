(function () {
    ///////////////////////////////////////////
    // Singleton Pattern
    locabooma.location = (function () {

        ///////////////////////////////////////////
        // PRIVATE
        var loc = new Windows.Devices.Geolocation.Geolocator();


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

        impl.prototype.getCurrentCoords = function () {
            loc.getGeopositionAsync().done(
            function (pos) { // position handler
                return {
                    longitude: pos.coordinate.longitude,
                    latitude: pos.coordinate.latitude,
                    accuracy: pos.coordinate.accuracy
                }
            },
            function (e) { // error handler
                return {
                    error: e.message,
                    status: loc.locationStatus
                }
            });
        }

        impl._instance = null;
        return impl;
    })();
})();
