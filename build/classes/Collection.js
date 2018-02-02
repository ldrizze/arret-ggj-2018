"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection = (function () {
    function Collection(key, list) {
        if (list === void 0) { list = null; }
        this.key = key;
        this.list = new Array;
        if (list && list.length > 0) {
            for (var i in list) {
                this.add(list[i]);
            }
        }
    }
    Collection.prototype.add = function (new_item) {
        this.list.push(new_item);
    };
    Collection.prototype.remove = function (key) {
        if (this.exists(key)) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i][this.key] == key) {
                    this.removeByIndex(i);
                    return true;
                }
            }
        }
        return false;
    };
    Collection.prototype.removeByObject = function (old_item) {
        var index = this.findIndex(old_item);
        if (index !== null) {
            this.list.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    };
    Collection.prototype.findIndex = function (object) {
        var index = null;
        for (var i = 0; i < this.length; i++) {
            if (this.list[i] == object) {
                index = i;
                break;
            }
        }
        return index;
    };
    Collection.prototype.removeByIndex = function (index) {
        if (this.list.length - 1 >= index) {
            this.list.splice(index, 1);
            return true;
        }
        else {
            return false;
        }
    };
    Collection.prototype.foreach = function (iterator_function) {
        if (typeof iterator_function == "function") {
            for (var i in this.list) {
                if (iterator_function(this.list[i], i) === false)
                    break;
            }
        }
        else {
            return false;
        }
    };
    Collection.prototype.get = function (key) {
        var rtn = new Array();
        for (var i = 0; i < this.length; i++) {
            if (this.list[i][this.key] == key)
                rtn.push(this.list[i]);
        }
        return rtn.length > 0 ? rtn : null;
    };
    Collection.prototype.getBy = function (key, term) {
        var rtn = new Array();
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i][key] == term)
                rtn.push(this.list[i]);
        }
        return rtn.length > 0 ? rtn : null;
    };
    Collection.prototype.findBy = function (key, term) {
        for (var i = 0; i < this.list.length; i++) {
            if (this.list[i][key] == term)
                return this.list[i];
        }
        return null;
    };
    Collection.prototype.getAll = function () {
        return this.list;
    };
    Collection.prototype.query = function (object) {
        return null;
    };
    Collection.prototype.find = function (key) {
        for (var i in this.list) {
            if (this.list[i][this.key] == key)
                return this.list[i];
        }
        return null;
    };
    Collection.prototype.exists = function (key) {
        return this.find(key) != null;
    };
    Object.defineProperty(Collection.prototype, "length", {
        get: function () {
            return this.list.length;
        },
        enumerable: true,
        configurable: true
    });
    Collection.prototype.toJson = function () {
        return JSON.stringify(this.list);
    };
    Collection.prototype.toString = function (separator) {
        if (separator === void 0) { separator = "\n"; }
        var retn = "";
        for (var i in this.list) {
            retn += this.list[i].toString() + separator;
        }
        return retn;
    };
    Collection.prototype.clear = function () {
        this.list = new Array();
    };
    return Collection;
}());
exports.Collection = Collection;
//# sourceMappingURL=Collection.js.map