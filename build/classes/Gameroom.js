"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("./Collection");
var Gameroom = (function () {
    function Gameroom(id, name, password, maxPlayers) {
        if (maxPlayers === void 0) { maxPlayers = 3; }
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
    Object.defineProperty(Gameroom.prototype, "host", {
        get: function () {
            return this._host;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gameroom.prototype, "isFull", {
        get: function () {
            return this.players.length == this.maxPlayers;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gameroom.prototype, "playerCount", {
        get: function () {
            return this.players.length;
        },
        enumerable: true,
        configurable: true
    });
    Gameroom.prototype.findPlayerById = function () {
    };
    Gameroom.prototype.update = function () {
    };
    Gameroom.prototype.setHost = function (host) {
        this._host = host;
    };
    return Gameroom;
}());
exports.Gameroom = Gameroom;
//# sourceMappingURL=Gameroom.js.map