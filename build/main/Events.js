"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("../classes/Collection");
var BallHasFiredEvent_1 = require("../events/BallHasFiredEvent");
var UserDisconnected_1 = require("../events/UserDisconnected");
exports.Events = new Collection_1.Collection("name", [
    BallHasFiredEvent_1.BallHasFiredEvent,
    UserDisconnected_1.UserDisconnected
]);
//# sourceMappingURL=Events.js.map