"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("./Collection");
var Gameroom = (function () {
    function Gameroom(id, name, password, maxPlayers) {
        if (maxPlayers === void 0) { maxPlayers = 10; }
        this.id = id;
        this.name = name;
        this.password = password;
        this.maxPlayers = maxPlayers;
        this.players = new Collection_1.Collection("name");
    }
    Gameroom.prototype.addPlayer = function (player) {
        this.players.add(player);
    };
    Gameroom.prototype.removePlayer = function () {
    };
    Object.defineProperty(Gameroom.prototype, "isFull", {
        get: function () {
            return this.players.length == this.maxPlayers;
        },
        enumerable: true,
        configurable: true
    });
    Gameroom.prototype.findPlayerById = function () {
    };
    Gameroom.prototype.update = function () {
    };
    return Gameroom;
}());
exports.Gameroom = Gameroom;
//# sourceMappingURL=Gameroom.js.map