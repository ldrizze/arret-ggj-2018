"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Collection_1 = require("./Collection");
var Logger_1 = require("./Logger");
var Timer_1 = require("./Timer");
var Gameroom = (function () {
    function Gameroom(name, maxPlayers, privategame) {
        if (maxPlayers === void 0) { maxPlayers = 3; }
        if (privategame === void 0) { privategame = false; }
        this.name = name;
        this.maxPlayers = maxPlayers;
        this.privategame = privategame;
        this.gameStarted = false;
        this.blue = false;
        this.red = false;
        this.log = new Logger_1.Log("Gameroom");
        this.players = new Collection_1.Collection("id");
        this._id = this.makeID();
        this.drones = new Collection_1.Collection("none");
        this.timer = new Timer_1.Timer;
    }
    Gameroom.prototype.addPlayer = function (player) {
        player.setGameroom(this);
        this.players.add(player);
    };
    Gameroom.prototype.removePlayer = function (player) {
        this.log.dbg("Removing player", player.id);
        if (this.players.remove(player.id)) {
            if (this._host != null && this._host.id == player.id)
                this.unsetHost();
            player.unsetGameroom();
        }
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
    Object.defineProperty(Gameroom.prototype, "id", {
        get: function () {
            return this._id;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gameroom.prototype, "isPrivate", {
        get: function () {
            return this.privategame;
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
    Gameroom.prototype.unsetHost = function () {
        this._host = null;
    };
    Gameroom.prototype.allPlayersAreReady = function () {
        var rdy = true;
        if (this.players.length > 0) {
            this.players.foreach(function (p) {
                if (!p.ready) {
                    rdy = false;
                    return false;
                }
            });
        }
        return rdy;
    };
    Gameroom.prototype.clearColors = function () {
        this.red = false;
        this.blue = false;
    };
    Gameroom.prototype.makeID = function () {
        var text = "";
        var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < 5; i++)
            text += possible.charAt(Math.floor(Math.random() * possible.length));
        return text.substr(0, 4);
    };
    return Gameroom;
}());
exports.Gameroom = Gameroom;
//# sourceMappingURL=Gameroom.js.map