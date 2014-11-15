(function () {

    // Sorts the groups.
    function compareGroups(leftKey, rightKey) {
        return leftKey.charCodeAt(0) - rightKey.charCodeAt(0);
    }

    // Returns the group key that an item belongs to.
    function getGroupKey(dataItem) {
        return dataItem.title.toUpperCase().charAt(0);
    }

    // Returns the title for a group.
    function getGroupData(dataItem) {
        return {
            title: dataItem.title.toUpperCase().charAt(0)
        };
    }

    WinJS.Namespace.define("vm", {

        bookmark: function (_title, _description) {
            this.date = Date.now(),
            this.title = _title,
            this.description = _description,
            this.longitude = 0.0,
            this.latitude = 0.0,
            this.location = "";
            this.image = ""
        },

        all: function (entries) {
            this.bm = entries;
            this.bookmarks = this.bm.createGrouped(getGroupKey, getGroupData, compareGroups);
            this.currentBookmark = new vm.bookmark();
        }
    })
    
    vm.all.prototype.selectBookmark = function (index) {
        this.currentBookmark = this.bookmarks.getAt(index);
    };
})();