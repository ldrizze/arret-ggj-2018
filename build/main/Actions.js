"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("../classes/Collection");
var Route_1 = require("../actions/Route");
var MakeMatch_1 = require("../actions/MakeMatch");
var GameplayLoaded_1 = require("../actions/GameplayLoaded");
var PlaceDrone_1 = require("../actions/PlaceDrone");
var MoveAlien_1 = require("../actions/MoveAlien");
var Tick_1 = require("../actions/Tick");
var DestroyDrone_1 = require("../actions/DestroyDrone");
var GameOver_1 = require("../actions/GameOver");
exports.Actions = new Collection_1.Collection("key", [
    new MakeMatch_1.MakeMatch(),
    new GameplayLoaded_1.GameplayLoaded(),
    new PlaceDrone_1.PlaceDrone(),
    new MoveAlien_1.MoveAlien(),
    new Tick_1.Tick(),
    new DestroyDrone_1.DestroyDrone(),
    new GameOver_1.GameOver(),
    new Route_1.Route()
]);
//# sourceMappingURL=Actions.js.map