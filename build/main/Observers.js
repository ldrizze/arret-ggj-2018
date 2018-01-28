"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("../classes/Collection");
var OnBallHasFired_1 = require("../observers/OnBallHasFired");
var OnUserDisconnect_1 = require("../observers/OnUserDisconnect");
exports.Observers = new Collection_1.Collection("event", [
    {
        event: "ballHasFired",
        observers: [
            OnBallHasFired_1.OnBallHasFiredObserver
        ]
    },
    {
        event: 'userDisconnected',
        observers: [
            OnUserDisconnect_1.OnUserDisconnect
        ]
    }
]);
//# sourceMappingURL=Observers.js.map