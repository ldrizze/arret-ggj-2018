"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("../classes/Collection");
var Route_1 = require("../actions/Route");
var MakeMatch_1 = require("../actions/MakeMatch");
exports.Actions = new Collection_1.Collection("key", [
    new MakeMatch_1.MakeMatch(),
    new Route_1.Route()
]);
//# sourceMappingURL=Actions.js.map