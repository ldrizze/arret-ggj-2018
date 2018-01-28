"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("./Collection");
var Event = (function () {
    function Event(eventname) {
        this.observers = new Collection_1.Collection('none');
        this.attachs = new Collection_1.Collection('key');
        this.eventname = eventname;
    }
    Event.prototype.register = function (ob) {
        ob.__setEvent(this);
        this.observers.add(ob);
        return this;
    };
    Event.prototype.notify = function () {
        this.observers.foreach(this.it.bind(this));
    };
    Event.prototype.attach = function (key, item) {
        this.attachs.add({
            'key': key,
            'item': item
        });
        return this;
    };
    Event.prototype.it = function (element, index) {
        element.run(this.attachs);
        this.attachs.clear();
    };
    Object.defineProperty(Event.prototype, "name", {
        get: function () {
            return this.eventname;
        },
        enumerable: true,
        configurable: true
    });
    return Event;
}());
exports.Event = Event;
//# sourceMappingURL=Event.js.map