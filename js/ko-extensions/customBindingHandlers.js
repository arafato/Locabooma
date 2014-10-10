/**
* handler for setting an ObservableArray as a datasource for as itemDataSource of a winControl
*/
ko.bindingHandlers["datasource"] = {
    update: function (element, valueAccessor) {
        var list = valueAccessor() || {};
        var dataList = new WinJS.Binding.List(list());
        if (element.winControl) {
            element.winControl.itemDataSource = dataList.dataSource;
        }
    }
};

/**
* handler for using a Knockout template to render the contents of a List or Grid
*/
ko.bindingHandlers["template"] = {
    update: function (element, valueAccessor) {
        var itemTemplateFunction = function (itemPromise, recycled) {
            return itemPromise.then(function (item) {
                var templateElement = recycled;
                var template = valueAccessor();
                if (!templateElement) {
                    var result = $(template.innerHTML).clone();
                    templateElement = result[0];
                } else {
                }
                WinJS.UI.processAll(templateElement).then(function () {
                    ko.applyBindings(item.data, templateElement);
                });
                return templateElement;
            });
        };
        if (element.winControl) {
            element.winControl.itemTemplate = itemTemplateFunction;
        }
    }
};