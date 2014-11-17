// Two-Way Binding
// Call as <input type="text" data-win-bind="value: name Binding.Mode.twoway" />
WinJS.Namespace.define("Binding.Mode", {
    twoway: WinJS.Binding.initializer(function (source, sourceProps, dest, destProps) {
        WinJS.Binding.defaultBind(source, sourceProps, dest, destProps);
        dest.onchange = function () {
            var d = dest[destProps[0]];
            var s = source[sourceProps[0]];
            if (s !== d) source[sourceProps[0]] = d;
        }
    })
});