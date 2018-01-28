"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var Event_1 = require("../classes/Event");
var Observer_1 = require("../classes/Observer");
var testObserver = (function (_super) {
    __extends(testObserver, _super);
    function testObserver() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    testObserver.prototype.run = function (attachs) {
        console.log("Oh my gosh, this event is on fire!");
        console.log("Let me see the attachs...");
        console.log(attachs);
    };
    return testObserver;
}(Observer_1.Observer));
var event = new Event_1.Event("testEvent");
var observer = new testObserver();
event.register(observer);
event.attach("um", "Attach one");
event.attach("two", "Attach two");
event.attach("three", "Attach three");
event.notify();
var Events_1 = require("../main/Events");
var Observers_1 = require("../main/Observers");
console.log("Well... Let's test the main Events register");
console.log(Events_1.Events.find("ballHasFired"));
Observers_1.Observers.foreach(function (obj, index) {
    if (Events_1.Events.exists(obj.event)) {
        var event_1 = Events_1.Events.find(obj.event);
        for (var ob in obj.observers) {
            console.log("Registering observer:", (new obj.observers[ob]).constructor.name);
            event_1.register(new obj.observers[ob]());
        }
    }
});
//# sourceMappingURL=events.js.map