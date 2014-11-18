WinJS.Namespace.define("converter", {
    visibleImg: WinJS.Binding.converter(function (value) {
        return value ? "block" : "none";
    }),

    visiblePhoto: WinJS.Binding.converter(function (value) {
        return !value ? "block" : "none";
    }),
});    